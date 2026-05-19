using Spectre.Console.Cli;

using VictorFrye.MicrosoftGraveyard.CommandLine.Services;
using VictorFrye.MicrosoftGraveyard.CommandLine.Validation;

namespace VictorFrye.MicrosoftGraveyard.CommandLine.Commands.Corpses;

/// <summary>
/// Adds a new corpse entry to the corpses document after validation succeeds.
/// </summary>
public sealed class AddCommand(CorpsesRepository repository, CorpseValidator validator) : Command<AddCommand.Settings>
{
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
        _ = settings;
        _ = cancellationToken;
        _ = repository;
        _ = validator;
        throw new NotImplementedException();
    }

    /// <summary>
    /// Represents the settings accepted by the add command.
    /// </summary>
    public sealed class Settings : CommandSettings
    {
    }
}
