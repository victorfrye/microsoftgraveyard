using System.Collections.Generic;
using System.Linq;

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
    public IOrderedEnumerable<Corpse> Sort(IEnumerable<Corpse> corpses)
    {
        ArgumentNullException.ThrowIfNull(corpses);
        return corpses.OrderByDescending(corpse => corpse.DeathDate ?? DateOnly.MinValue)
            .ThenBy(corpse => corpse.Name, StringComparer.OrdinalIgnoreCase);
    }

    /// <summary>
    /// Describes the ordering differences between two corpse lists.
    /// </summary>
    /// <param name="before">The original ordering.</param>
    /// <param name="after">The new ordering.</param>
    /// <returns>A human-readable diff, or <see langword="null"/> when the lists are identical.</returns>
    public string? GetDiff(IReadOnlyList<Corpse> before, IReadOnlyList<Corpse> after)
    {
        ArgumentNullException.ThrowIfNull(before);
        ArgumentNullException.ThrowIfNull(after);

        if (before.SequenceEqual(after, CorpseIdentityComparer.Instance))
        {
            return null;
        }

        Dictionary<string, int> originalPositions = before
            .Select((corpse, index) => new KeyValuePair<string, int>(GetIdentity(corpse), index))
            .ToDictionary(pair => pair.Key, pair => pair.Value, StringComparer.Ordinal);

        List<string> messages = [];
        for (int index = 0; index < after.Count; index++)
        {
            Corpse corpse = after[index];
            string identity = GetIdentity(corpse);
            if (!originalPositions.TryGetValue(identity, out int originalIndex))
            {
                messages.Add($"Added '{GetDisplayName(corpse)}' at position {index + 1}.");
                continue;
            }

            if (originalIndex != index)
            {
                messages.Add($"Moved '{GetDisplayName(corpse)}' from position {originalIndex + 1} to {index + 1}.");
            }
        }

        return messages.Count == 0 ? "The corpse ordering differs from the canonical sort order." : string.Join(Environment.NewLine, messages);
    }

    /// <summary>
    /// Determines whether the provided corpse list already matches the canonical order.
    /// </summary>
    /// <param name="corpses">The corpse entries to inspect.</param>
    /// <returns><see langword="true"/> when the entries are already sorted; otherwise, <see langword="false"/>.</returns>
    public bool IsAlreadySorted(IReadOnlyList<Corpse> corpses)
    {
        ArgumentNullException.ThrowIfNull(corpses);
        return corpses.SequenceEqual(Sort(corpses), CorpseIdentityComparer.Instance);
    }

    private static string GetDisplayName(Corpse corpse)
    {
        return string.IsNullOrWhiteSpace(corpse.Qualifier) ? corpse.Name : $"{corpse.Name} ({corpse.Qualifier})";
    }

    private static string GetIdentity(Corpse corpse)
    {
        string deathDate = corpse.DeathDate?.ToString("yyyy-MM-dd") ?? string.Empty;
        string birthDate = corpse.BirthDate?.ToString("yyyy-MM-dd") ?? string.Empty;
        return string.Join("\u001f", corpse.Name, corpse.Qualifier ?? string.Empty, birthDate, deathDate, corpse.Description, corpse.Link);
    }

    private sealed class CorpseIdentityComparer : IEqualityComparer<Corpse>
    {
        public static CorpseIdentityComparer Instance { get; } = new();

        public bool Equals(Corpse? x, Corpse? y)
        {
            if (ReferenceEquals(x, y))
            {
                return true;
            }

            if (x is null || y is null)
            {
                return false;
            }

            return string.Equals(GetIdentity(x), GetIdentity(y), StringComparison.Ordinal);
        }

        public int GetHashCode(Corpse obj)
        {
            return StringComparer.Ordinal.GetHashCode(GetIdentity(obj));
        }
    }
}
