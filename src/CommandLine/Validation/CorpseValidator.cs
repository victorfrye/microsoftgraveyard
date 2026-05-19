using System.Collections.Generic;

using VictorFrye.MicrosoftGraveyard.CommandLine.Models;

namespace VictorFrye.MicrosoftGraveyard.CommandLine.Validation;

/// <summary>
/// Validates corpse input before changes are written to the shared document.
/// </summary>
public sealed class CorpseValidator
{
    /// <summary>
    /// Validates a corpse entry and returns any validation failures.
    /// </summary>
    /// <param name="corpse">The corpse entry to validate.</param>
    /// <returns>A collection of validation errors.</returns>
    public IReadOnlyList<string> Validate(Corpse corpse)
    {
        _ = corpse;
        throw new NotImplementedException();
    }
}
