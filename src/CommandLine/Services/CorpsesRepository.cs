using VictorFrye.MicrosoftGraveyard.CommandLine.Models;

namespace VictorFrye.MicrosoftGraveyard.CommandLine.Services;

/// <summary>
/// Loads and persists the shared corpses document used by the web site and command-line tooling.
/// </summary>
public sealed class CorpsesRepository
{
    /// <summary>
    /// Gets the relative path to the shared corpses JSON document.
    /// </summary>
    public const string CorpsesDocumentRelativePath = "..\\WebClient\\app\\graveyard\\corpses.json";

    /// <summary>
    /// Loads the corpses document from disk.
    /// </summary>
    /// <param name="cancellationToken">The token used to cancel the operation.</param>
    /// <returns>The loaded corpses document.</returns>
    public Task<CorpsesDocument> LoadAsync(CancellationToken cancellationToken = default)
    {
        _ = cancellationToken;
        throw new NotImplementedException();
    }

    /// <summary>
    /// Persists the corpses document back to disk.
    /// </summary>
    /// <param name="document">The document to save.</param>
    /// <param name="cancellationToken">The token used to cancel the operation.</param>
    /// <returns>A task that completes when the save operation finishes.</returns>
    public Task SaveAsync(CorpsesDocument document, CancellationToken cancellationToken = default)
    {
        _ = document;
        _ = cancellationToken;
        throw new NotImplementedException();
    }
}
