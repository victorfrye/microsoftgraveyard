using Spectre.Console.Cli;

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
        _ = settings;
        _ = cancellationToken;
        _ = repository;
        throw new NotImplementedException();
    }

    /// <summary>
    /// Represents the settings accepted by the list command.
    /// </summary>
    public sealed class Settings : CommandSettings
    {
    }
}
