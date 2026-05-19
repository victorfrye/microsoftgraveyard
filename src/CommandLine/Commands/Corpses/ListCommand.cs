using System.ComponentModel;
using System.Text.Json;

using Spectre.Console;
using Spectre.Console.Cli;

using VictorFrye.MicrosoftGraveyard.CommandLine.Models;
using VictorFrye.MicrosoftGraveyard.CommandLine.Services;

namespace VictorFrye.MicrosoftGraveyard.CommandLine.Commands.Corpses;

/// <summary>
/// Lists the corpse entries available in the shared corpses document.
/// </summary>
public sealed class ListCommand(CorpsesRepository repository) : Command<ListCommand.Settings>
{
    /// <summary>
    /// Gets the command name used under the corpses branch.
    /// </summary>
    public const string CommandName = "list";

    /// <summary>
    /// Gets the short description displayed in help output.
    /// </summary>
    public const string CommandDescription = "List the current corpse entries.";

    /// <inheritdoc />
    protected override int Execute(CommandContext context, Settings settings, CancellationToken cancellationToken)
    {
        _ = context;

        IReadOnlyList<Corpse> corpses = repository.LoadAsync(cancellationToken).GetAwaiter().GetResult().Corpses;
        if (string.Equals(settings.Format, "json", StringComparison.OrdinalIgnoreCase))
        {
            string json = JsonSerializer.Serialize(corpses, CorpsesRepository.CreateJsonSerializerOptions());
            Console.WriteLine(json);
            return 0;
        }

        if (!string.Equals(settings.Format, "pretty", StringComparison.OrdinalIgnoreCase))
        {
            AnsiConsole.MarkupLine($"[red]Unsupported format '{Markup.Escape(settings.Format)}'. Use 'pretty' or 'json'.[/]");
            return 1;
        }

        Table table = new();
        table.AddColumn("[bold]Name[/]");
        table.AddColumn("Death Date");
        table.AddColumn("Description");

        foreach (Corpse corpse in corpses)
        {
            table.AddRow(
                Markup.Escape(GetDisplayName(corpse)),
                corpse.DeathDate?.ToString("yyyy-MM-dd") ?? string.Empty,
                Markup.Escape(Truncate(corpse.Description, 80)));
        }

        AnsiConsole.Write(table);
        return 0;
    }

    /// <summary>
    /// Represents the settings accepted by the list command.
    /// </summary>
    public sealed class Settings : CommandSettings
    {
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

    private static string Truncate(string value, int maxLength)
    {
        if (value.Length <= maxLength)
        {
            return value;
        }

        return string.Concat(value.AsSpan(0, maxLength - 3), "...");
    }
}
