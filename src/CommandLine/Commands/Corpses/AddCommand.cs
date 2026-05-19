using System.ComponentModel;
using System.Globalization;

using Spectre.Console;
using Spectre.Console.Cli;

using VictorFrye.MicrosoftGraveyard.CommandLine.Models;
using VictorFrye.MicrosoftGraveyard.CommandLine.Services;
using VictorFrye.MicrosoftGraveyard.CommandLine.Validation;

namespace VictorFrye.MicrosoftGraveyard.CommandLine.Commands.Corpses;

/// <summary>
/// Adds a new corpse entry to the corpses document after validation succeeds.
/// </summary>
public sealed class AddCommand(CorpsesRepository repository, CorpseValidator validator, CorpseSorter sorter, ObitWriter obitWriter) : Command<AddCommand.Settings>
{
    private const string DateFormat = "yyyy-MM-dd";
    private const string AspireEnvironmentVariable = "DOTNET_DASHBOARD_OTLP_ENDPOINT_URL";

    /// <summary>
    /// Gets the command name used under the corpses branch.
    /// </summary>
    public const string CommandName = "add";

    /// <summary>
    /// Gets the short description displayed in help output.
    /// </summary>
    public const string CommandDescription = "Add a new corpse entry to the graveyard.";

    /// <inheritdoc />
    protected override int Execute(CommandContext context, Settings settings, CancellationToken cancellationToken)
    {
        _ = context;

        CorpsesDocument document = repository.LoadAsync(cancellationToken).GetAwaiter().GetResult();
        bool canPrompt = string.IsNullOrWhiteSpace(Environment.GetEnvironmentVariable(AspireEnvironmentVariable));

        if (!canPrompt && HasMissingRequiredFields(settings))
        {
            AnsiConsole.MarkupLine("[red]Required arguments are missing. Provide --name, --death-date, --description, and --link when running under Aspire.[/]");
            return 1;
        }

        string? qualifier = settings.Qualifier;
        string? birthDateText = settings.BirthDate;
        string? name = settings.Name;
        string? deathDateText = settings.DeathDate;
        string? description = settings.Description;
        string? link = settings.Link;

        if (canPrompt)
        {
            name = PromptIfMissing(name, "Product [bold]name[/]:");
            qualifier = PromptOptionalIfMissing(qualifier, "Optional [bold]qualifier[/] (press Enter to skip):");
            birthDateText = PromptOptionalIfMissing(birthDateText, "Birth date [dim](YYYY-MM-DD, or press Enter to skip)[/]:");
            deathDateText = PromptIfMissing(deathDateText, "Death date [bold](YYYY-MM-DD)[/]:");
            description = PromptIfMissing(description, "Description (lowercase, no trailing period):");
            link = PromptIfMissing(link, "Reference [bold]link[/] (URL):");
        }

        List<string> parsingErrors = [];
        DateOnly? birthDate = ParseOptionalDate(birthDateText, "Birth date", parsingErrors);
        DateOnly? deathDate = ParseRequiredDate(deathDateText, "Death date", parsingErrors);
        if (parsingErrors.Count > 0)
        {
            foreach (string error in parsingErrors)
            {
                AnsiConsole.MarkupLine($"[red]{Markup.Escape(error)}[/]");
            }

            return 1;
        }

        Corpse corpse = new()
        {
            Name = name?.Trim() ?? string.Empty,
            Qualifier = NormalizeOptional(qualifier),
            BirthDate = birthDate,
            DeathDate = deathDate,
            Description = description?.Trim() ?? string.Empty,
            Link = link?.Trim() ?? string.Empty,
        };

        VictorFrye.MicrosoftGraveyard.CommandLine.Validation.ValidationResult validation = validator.ValidateForAdd(corpse, document.Corpses);
        if (!validation.IsValid)
        {
            foreach (string error in validation.Errors)
            {
                AnsiConsole.MarkupLine($"[red]{Markup.Escape(error)}[/]");
            }

            return 1;
        }

        foreach (string warning in validation.Warnings)
        {
            AnsiConsole.MarkupLine($"[yellow]{Markup.Escape(warning)}[/]");
        }

        document.Corpses.Add(corpse);
        if (!settings.NoSort)
        {
            document.Corpses = sorter.Sort(document.Corpses).ToList();
        }

        repository.SaveAsync(document, cancellationToken).GetAwaiter().GetResult();

        string obituary = obitWriter.GenerateObituary(corpse, DateOnly.FromDateTime(DateTime.Today));
        AnsiConsole.WriteLine(obituary);
        AnsiConsole.MarkupLine($"[green]✓ Added {Markup.Escape(corpse.Name)} to the graveyard.[/]");
        return 0;
    }

    /// <summary>
    /// Represents the settings accepted by the add command.
    /// </summary>
    public sealed class Settings : CommandSettings
    {
        /// <summary>
        /// Gets or sets the corpse name.
        /// </summary>
        [CommandOption("--name <NAME>")]
        public string? Name { get; set; }

        /// <summary>
        /// Gets or sets the optional corpse qualifier.
        /// </summary>
        [CommandOption("--qualifier <QUALIFIER>")]
        public string? Qualifier { get; set; }

        /// <summary>
        /// Gets or sets the optional birth date in yyyy-MM-dd format.
        /// </summary>
        [CommandOption("--birth-date <DATE>")]
        public string? BirthDate { get; set; }

        /// <summary>
        /// Gets or sets the death date in yyyy-MM-dd format.
        /// </summary>
        [CommandOption("--death-date <DATE>")]
        public string? DeathDate { get; set; }

        /// <summary>
        /// Gets or sets the obituary description.
        /// </summary>
        [CommandOption("--description <DESCRIPTION>")]
        public string? Description { get; set; }

        /// <summary>
        /// Gets or sets the reference link.
        /// </summary>
        [CommandOption("--link <URL>")]
        public string? Link { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether sorting should be skipped after add.
        /// </summary>
        [CommandOption("--no-sort")]
        [DefaultValue(false)]
        public bool NoSort { get; set; }
    }

    private static bool HasMissingRequiredFields(Settings settings)
    {
        return string.IsNullOrWhiteSpace(settings.Name)
            || string.IsNullOrWhiteSpace(settings.DeathDate)
            || string.IsNullOrWhiteSpace(settings.Description)
            || string.IsNullOrWhiteSpace(settings.Link);
    }

    private static string PromptIfMissing(string? value, string prompt)
    {
        return string.IsNullOrWhiteSpace(value) ? AnsiConsole.Ask<string>(prompt).Trim() : value.Trim();
    }

    private static string? PromptOptionalIfMissing(string? value, string prompt)
    {
        return string.IsNullOrWhiteSpace(value) ? NormalizeOptional(AnsiConsole.Ask<string>(prompt)) : NormalizeOptional(value);
    }

    private static string? NormalizeOptional(string? value)
    {
        return string.IsNullOrWhiteSpace(value) ? null : value.Trim();
    }

    private static DateOnly? ParseOptionalDate(string? value, string fieldName, List<string> errors)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return null;
        }

        if (DateOnly.TryParseExact(value.Trim(), DateFormat, CultureInfo.InvariantCulture, DateTimeStyles.None, out DateOnly parsedDate))
        {
            return parsedDate;
        }

        errors.Add($"{fieldName} must use {DateFormat} format.");
        return null;
    }

    private static DateOnly? ParseRequiredDate(string? value, string fieldName, List<string> errors)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            errors.Add($"{fieldName} is required.");
            return null;
        }

        return ParseOptionalDate(value, fieldName, errors);
    }
}
