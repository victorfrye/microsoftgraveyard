using System.ComponentModel;
using System.Text;
using System.Text.Json;

using Spectre.Console;
using Spectre.Console.Cli;

using VictorFrye.MicrosoftGraveyard.CommandLine.Models;
using VictorFrye.MicrosoftGraveyard.CommandLine.Services;

namespace VictorFrye.MicrosoftGraveyard.CommandLine.Commands.Corpses;

/// <summary>
/// Shows a single corpse entry together with the obituary content generated for it.
/// </summary>
public sealed class ShowCommand(CorpsesRepository repository, ObitWriter obitWriter) : Command<ShowCommand.Settings>
{
    /// <summary>
    /// Gets the command name used under the corpses branch.
    /// </summary>
    public const string CommandName = "show";

    /// <summary>
    /// Gets the short description displayed in help output.
    /// </summary>
    public const string CommandDescription = "Show one corpse entry and its generated obituary.";

    /// <inheritdoc />
    protected override int Execute(CommandContext context, Settings settings, CancellationToken cancellationToken)
    {
        _ = context;

        IReadOnlyList<Corpse> corpses = repository.LoadAsync(cancellationToken).GetAwaiter().GetResult().Corpses;
        List<Corpse> matches = corpses
            .Where(corpse => IsMatch(corpse, settings.Name))
            .ToList();

        if (matches.Count == 0)
        {
            string requestedName = settings.Name ?? string.Empty;
            AnsiConsole.MarkupLine($"[red]No corpse found matching '{Markup.Escape(requestedName)}'.[/]");
            return 1;
        }

        Corpse selected = matches.Count == 1
            ? matches[0]
            : AnsiConsole.Prompt(
                new SelectionPrompt<Corpse>()
                    .Title("Multiple matches found. Choose a corpse:")
                    .AddChoices(matches)
                    .UseConverter(GetDisplayName));

        if (string.Equals(settings.Format, "json", StringComparison.OrdinalIgnoreCase))
        {
            string json = JsonSerializer.Serialize(selected, CorpsesRepository.CreateJsonSerializerOptions());
            Console.WriteLine(json);
            return 0;
        }

        if (!string.Equals(settings.Format, "pretty", StringComparison.OrdinalIgnoreCase))
        {
            AnsiConsole.MarkupLine($"[red]Unsupported format '{Markup.Escape(settings.Format)}'. Use 'pretty' or 'json'.[/]");
            return 1;
        }

        string obituary = obitWriter.GenerateObituary(selected, DateOnly.FromDateTime(DateTime.Today));
        StringBuilder content = new();
        content.AppendLine($"[bold]Name:[/] {Markup.Escape(selected.Name)}");

        if (!string.IsNullOrWhiteSpace(selected.Qualifier))
        {
            content.AppendLine($"[bold]Qualifier:[/] {Markup.Escape(selected.Qualifier)}");
        }

        if (selected.BirthDate is { } birthDate)
        {
            content.AppendLine($"[bold]Birth Date:[/] {birthDate:yyyy-MM-dd}");
        }

        content.AppendLine($"[bold]Death Date:[/] {(selected.DeathDate is { } deathDate ? deathDate.ToString("yyyy-MM-dd") : string.Empty)}");
        content.AppendLine($"[bold]Description:[/] {Markup.Escape(selected.Description)}");
        content.AppendLine($"[bold]Link:[/] {Markup.Escape(selected.Link)}");
        content.AppendLine();
        content.Append($"[bold]Obituary:[/] {Markup.Escape(obituary)}");

        Panel panel = new(new Markup(content.ToString()))
        {
            Header = new PanelHeader(Markup.Escape(GetDisplayName(selected))),
        };

        AnsiConsole.Write(panel);
        return 0;
    }

    /// <summary>
    /// Represents the settings accepted by the show command.
    /// </summary>
    public sealed class Settings : CommandSettings
    {
        /// <summary>
        /// Gets or sets the corpse name filter.
        /// </summary>
        [CommandOption("--name <NAME>")]
        public string? Name { get; set; }

        /// <summary>
        /// Gets or sets the output format.
        /// </summary>
        [CommandOption("--format <FORMAT>")]
        [DefaultValue("pretty")]
        public string Format { get; set; } = "pretty";
    }

    private static string GetDisplayName(Corpse corpse)
    {
        return string.IsNullOrWhiteSpace(corpse.Qualifier) ? corpse.Name : $"{corpse.Name} ({corpse.Qualifier})";
    }

    private static bool IsMatch(Corpse corpse, string? filter)
    {
        if (string.IsNullOrWhiteSpace(filter))
        {
            return true;
        }

        return corpse.Name.Contains(filter, StringComparison.OrdinalIgnoreCase)
            || GetDisplayName(corpse).Contains(filter, StringComparison.OrdinalIgnoreCase);
    }
}
