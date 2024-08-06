using VictorFrye.MicrosoftGraveyard.Models;

using FluentIcons = Microsoft.FluentUI.AspNetCore.Components.Icons;

namespace VictorFrye.MicrosoftGraveyard.Data;

public static class SocialMedia
{
    public static readonly Social Threads = new(
        name: "Threads",
        icon: new Icons.Threads(),
        userHref: "https://threads.net/@microsoftgraveyard"
        );

    public static readonly Social GitHub = new(
        name: "GitHub",
        icon: new Icons.GitHub(),
        userHref: "https://github.com/victorfrye/microsoftgraveyard"
        );

    public static readonly HashSet<Social> All = [Threads, GitHub];
}
