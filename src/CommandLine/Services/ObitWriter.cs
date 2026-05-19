using VictorFrye.MicrosoftGraveyard.CommandLine.Models;

namespace VictorFrye.MicrosoftGraveyard.CommandLine.Services;

/// <summary>
/// Produces obituary text for console output and future file-based workflows.
/// </summary>
public sealed class ObitWriter
{
    /// <summary>
    /// Generates the obituary text for a corpse entry.
    /// </summary>
    /// <param name="corpse">The corpse being memorialized.</param>
    /// <returns>The generated obituary text.</returns>
    public string Write(Corpse corpse)
    {
        _ = corpse;
        throw new NotImplementedException();
    }
}
