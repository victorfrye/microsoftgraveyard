using Spectre.Console.Cli;

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
        _ = settings;
        _ = cancellationToken;
        _ = repository;
        _ = sorter;
        throw new NotImplementedException();
    }

    /// <summary>
    /// Represents the settings accepted by the sort command.
    /// </summary>
    public sealed class Settings : CommandSettings
    {
    }
}
