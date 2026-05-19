using Spectre.Console;
using Spectre.Console.Cli;

using VictorFrye.MicrosoftGraveyard.CommandLine.Models;
using VictorFrye.MicrosoftGraveyard.CommandLine.Services;

namespace VictorFrye.MicrosoftGraveyard.CommandLine.Commands.Corpses;

/// <summary>
/// Sorts the corpses document into the canonical order before it is written back to disk.
/// </summary>
public sealed class SortCommand(CorpsesRepository repository, CorpseSorter sorter) : Command<SortCommand.Settings>
{
    /// <summary>
    /// Gets the command name used under the corpses branch.
    /// </summary>
    public const string CommandName = "sort";

    /// <summary>
    /// Gets the short description displayed in help output.
    /// </summary>
    public const string CommandDescription = "Sort the corpses document by the project rules.";

    /// <inheritdoc />
    protected override int Execute(CommandContext context, Settings settings, CancellationToken cancellationToken)
    {
        _ = context;

        Models.CorpsesDocument document = repository.LoadAsync(cancellationToken).GetAwaiter().GetResult();
        List<Corpse> sortedCorpses = sorter.Sort(document.Corpses).ToList();

        if (settings.Verify)
        {
            if (sorter.IsAlreadySorted(document.Corpses))
            {
                AnsiConsole.MarkupLine("[green]✓ corpses.json is already sorted correctly.[/]");
                return 0;
            }

            AnsiConsole.MarkupLine("[red]✗ corpses.json is NOT sorted.[/]");
            string? diff = sorter.GetDiff(document.Corpses, sortedCorpses);
            if (!string.IsNullOrWhiteSpace(diff))
            {
                AnsiConsole.WriteLine(diff);
            }

            return 1;
        }

        document.Corpses = sortedCorpses;
        repository.SaveAsync(document, cancellationToken).GetAwaiter().GetResult();
        AnsiConsole.MarkupLine($"[green]✓ Sorted {sortedCorpses.Count} corpses.[/]");
        return 0;
    }

    /// <summary>
    /// Represents the settings accepted by the sort command.
    /// </summary>
    public sealed class Settings : CommandSettings
    {
        /// <summary>
        /// Gets or sets a value indicating whether the command should only verify the sort order.
        /// </summary>
        [CommandOption("--verify|-v|--check")]
        public bool Verify { get; set; }
    }
}
