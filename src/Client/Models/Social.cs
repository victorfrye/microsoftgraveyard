namespace VictorFrye.MicrosoftGraveyard.Client.Models;

public class Social(string name, string iconUrl, string userUrl)
{
    public string Name { get; init; } = name;
    public string IconUrl { get; init; } = iconUrl;
    public string UserUrl { get; init; } = userUrl;
}
