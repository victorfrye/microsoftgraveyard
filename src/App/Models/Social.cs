using Microsoft.AspNetCore.Components;
using Microsoft.FluentUI.AspNetCore.Components;

namespace VictorFrye.Graveyard.Models;

public class Social(string name, Icon icon, string userHref)
{
    public string Name { get; init; } = name;
    public Icon Icon { get; init; } = icon;
    public string UserHref { get; init; } = userHref;
}
