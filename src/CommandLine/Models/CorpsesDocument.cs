using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace VictorFrye.MicrosoftGraveyard.CommandLine.Models;

/// <summary>
/// Represents the full corpses document loaded from the shared JSON data source.
/// </summary>
public sealed class CorpsesDocument
{
    /// <summary>
    /// Gets or sets the schema document that describes the corpses payload.
    /// </summary>
    [JsonPropertyName("$schema")]
    public string Schema { get; set; } = "https://raw.githubusercontent.com/victorfrye/microsoftgraveyard/main/files/corpses.schema.json";

    /// <summary>
    /// Gets or sets the corpses tracked by the document.
    /// </summary>
    [JsonPropertyName("corpses")]
    public List<Corpse> Corpses { get; set; } = [];
}
