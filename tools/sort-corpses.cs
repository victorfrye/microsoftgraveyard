using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Json.Nodes;

const string CorpsesPath = "src/WebClient/app/graveyard/corpses.json";

var json = await File.ReadAllTextAsync(CorpsesPath);
var doc = JsonNode.Parse(json)!;
var corpses = doc["corpses"]!.AsArray();

var sorted = corpses
    .Select(c => JsonNode.Parse(c!.ToJsonString())!)
    .OrderByDescending(c => c["deathDate"]!.GetValue<string>())
    .ThenBy(c => c["name"]!.GetValue<string>())
    .ToList();

corpses.Clear();
foreach (var corpse in sorted)
    corpses.Add(corpse);

var options = new JsonSerializerOptions { WriteIndented = true, Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping };
await File.WriteAllTextAsync(CorpsesPath, doc.ToJsonString(options) + Environment.NewLine);

Console.WriteLine($"✓ Sorted {sorted.Count} corpses in {CorpsesPath}");
