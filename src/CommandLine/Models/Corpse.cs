namespace VictorFrye.MicrosoftGraveyard.CommandLine.Models;

/// <summary>
/// Represents a single Microsoft product memorialized in the corpses document.
/// </summary>
public sealed class Corpse
{
    /// <summary>
    /// Gets or sets the product name.
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the optional qualifier used to distinguish the product.
    /// </summary>
    public string? Qualifier { get; set; }

    /// <summary>
    /// Gets or sets the product launch date.
    /// </summary>
    public DateOnly? BirthDate { get; set; }

    /// <summary>
    /// Gets or sets the product retirement date.
    /// </summary>
    public DateOnly? DeathDate { get; set; }

    /// <summary>
    /// Gets or sets the obituary description.
    /// </summary>
    public string Description { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the canonical source link.
    /// </summary>
    public string Link { get; set; } = string.Empty;
}
