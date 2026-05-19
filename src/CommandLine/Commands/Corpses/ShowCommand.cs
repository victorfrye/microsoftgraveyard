using Spectre.Console.Cli;

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
        _ = settings;
        _ = cancellationToken;
        _ = repository;
        _ = obitWriter;
        throw new NotImplementedException();
    }

    /// <summary>
    /// Represents the settings accepted by the show command.
    /// </summary>
    public sealed class Settings : CommandSettings
    {
    }
}
