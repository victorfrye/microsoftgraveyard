using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

using VictorFrye.MicrosoftGraveyard.CommandLine.Models;

namespace VictorFrye.MicrosoftGraveyard.CommandLine.Services;

/// <summary>
/// Loads and persists the shared corpses document used by the web site and command-line tooling.
/// </summary>
public sealed class CorpsesRepository
{
    private static readonly JsonSerializerOptions JsonSerializerOptions = CreateJsonSerializerOptions();

    /// <summary>
    /// Gets the relative path to the shared corpses JSON document.
    /// </summary>
    public const string CorpsesDocumentRelativePath = "src\\WebClient\\app\\graveyard\\corpses.json";

    /// <summary>
    /// Loads the corpses document from disk.
    /// </summary>
    /// <param name="cancellationToken">The token used to cancel the operation.</param>
    /// <returns>The loaded corpses document.</returns>
    public async Task<CorpsesDocument> LoadAsync(CancellationToken cancellationToken = default)
    {
        string documentPath = GetDocumentPath();
        string json = await File.ReadAllTextAsync(documentPath, cancellationToken).ConfigureAwait(false);

        CorpsesDocument? document = JsonSerializer.Deserialize<CorpsesDocument>(json, JsonSerializerOptions);
        return document ?? new CorpsesDocument();
    }

    /// <summary>
    /// Persists the corpses document back to disk.
    /// </summary>
    /// <param name="document">The document to save.</param>
    /// <param name="cancellationToken">The token used to cancel the operation.</param>
    /// <returns>A task that completes when the save operation finishes.</returns>
    public async Task SaveAsync(CorpsesDocument document, CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(document);

        string documentPath = GetDocumentPath();
        string json = JsonSerializer.Serialize(document, JsonSerializerOptions);
        await File.WriteAllTextAsync(documentPath, json + Environment.NewLine, cancellationToken).ConfigureAwait(false);
    }

    /// <summary>
    /// Creates the shared JSON serializer options used by the CLI.
    /// </summary>
    /// <returns>The configured serializer options.</returns>
    public static JsonSerializerOptions CreateJsonSerializerOptions()
    {
        JsonSerializerOptions options = new()
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
            WriteIndented = true,
            IndentCharacter = ' ',
            IndentSize = 2,
        };

        options.Converters.Add(new DateOnlyJsonConverter());
        return options;
    }

    private static string GetDocumentPath()
    {
        return Path.Combine(Directory.GetCurrentDirectory(), "src", "WebClient", "app", "graveyard", "corpses.json");
    }

    private sealed class DateOnlyJsonConverter : JsonConverter<DateOnly>
    {
        private const string DateFormat = "yyyy-MM-dd";

        public override DateOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            string? value = reader.GetString();
            if (string.IsNullOrWhiteSpace(value))
            {
                throw new JsonException("Date values must be provided in yyyy-MM-dd format.");
            }

            if (DateOnly.TryParseExact(value, DateFormat, CultureInfo.InvariantCulture, DateTimeStyles.None, out DateOnly date))
            {
                return date;
            }

            throw new JsonException($"Date value '{value}' must be in yyyy-MM-dd format.");
        }

        public override void Write(Utf8JsonWriter writer, DateOnly value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value.ToString(DateFormat, CultureInfo.InvariantCulture));
        }
    }
}
