using System.Collections.Generic;

using VictorFrye.MicrosoftGraveyard.CommandLine.Models;

namespace VictorFrye.MicrosoftGraveyard.CommandLine.Validation;

/// <summary>
/// Validates corpse input before changes are written to the shared document.
/// </summary>
public sealed class CorpseValidator
{
    /// <summary>
    /// Validates a corpse entry before it is added to the shared corpses document.
    /// </summary>
    /// <param name="corpse">The corpse entry to validate.</param>
    /// <param name="existing">The existing corpse entries used for duplicate detection.</param>
    /// <returns>The validation result containing errors and warnings.</returns>
    public ValidationResult ValidateForAdd(Corpse corpse, IReadOnlyList<Corpse> existing)
    {
        ArgumentNullException.ThrowIfNull(corpse);
        ArgumentNullException.ThrowIfNull(existing);

        List<string> errors = [];
        List<string> warnings = [];

        if (string.IsNullOrWhiteSpace(corpse.Name))
        {
            errors.Add("Name is required.");
        }

        if (corpse.DeathDate is null || corpse.DeathDate == default)
        {
            errors.Add("Death date is required.");
        }

        if (string.IsNullOrWhiteSpace(corpse.Description))
        {
            errors.Add("Description is required.");
        }

        if (string.IsNullOrWhiteSpace(corpse.Link) || !Uri.TryCreate(corpse.Link, UriKind.Absolute, out Uri? parsedLink))
        {
            errors.Add("Link must be a valid absolute URL.");
        }
        else if (parsedLink.Host.Contains("wikipedia.org", StringComparison.OrdinalIgnoreCase))
        {
            warnings.Add("Wikipedia links are discouraged. Prefer a primary or higher-quality secondary source.");
        }

        if (!string.IsNullOrWhiteSpace(corpse.Name) && existing.Any(existingCorpse => string.Equals(existingCorpse.Name, corpse.Name, StringComparison.OrdinalIgnoreCase)))
        {
            errors.Add($"A corpse named '{corpse.Name}' already exists.");
        }

        if (corpse.BirthDate is { } birthDate && corpse.DeathDate is { } deathDate && birthDate >= deathDate)
        {
            errors.Add("Birth date must be earlier than death date.");
        }

        return new ValidationResult(errors.Count == 0, errors, warnings);
    }
}
