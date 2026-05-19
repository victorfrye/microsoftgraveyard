using System.Collections.Generic;

using VictorFrye.MicrosoftGraveyard.CommandLine.Models;

namespace VictorFrye.MicrosoftGraveyard.CommandLine.Services;

/// <summary>
/// Applies the project ordering rules so corpses are emitted in a predictable sequence.
/// </summary>
public sealed class CorpseSorter
{
    /// <summary>
    /// Sorts corpse entries using the command-line canonical order.
    /// </summary>
    /// <param name="corpses">The corpse entries to sort.</param>
    /// <returns>The sorted corpse entries.</returns>
    public IReadOnlyList<Corpse> Sort(IEnumerable<Corpse> corpses)
    {
        _ = corpses;
        throw new NotImplementedException();
    }
}
