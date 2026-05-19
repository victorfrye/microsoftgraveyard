using System.Collections.Generic;

namespace VictorFrye.MicrosoftGraveyard.CommandLine.Models;

/// <summary>
/// Represents the full corpses document loaded from the shared JSON data source.
/// </summary>
public sealed class CorpsesDocument
{
    /// <summary>
    /// Gets or sets the corpses tracked by the document.
    /// </summary>
    public IReadOnlyList<Corpse> Corpses { get; set; } = [];
}
