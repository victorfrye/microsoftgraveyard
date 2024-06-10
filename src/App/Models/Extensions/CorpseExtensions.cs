using Microsoft.FluentUI.AspNetCore.Components;

namespace VictorFrye.Graveyard.Models.Extensions;

public static class CorpseExtensions
{
    public static string GetImage(this Corpse corpse, DateOnly date) =>
        corpse.IsDead(date) ? "./images/headstone.svg" : "./images/coffin.svg";

    public static Emoji GetEmoji(this Corpse corpse, DateOnly date) =>
        corpse.IsDead(date) ? new Emojis.Objects.Color.Default.Headstone() : new Emojis.Objects.Color.Default.Coffin();

    public static string GetHeadstoneDates(this Corpse corpse, DateOnly date) =>
        corpse.IsDead(date) ? corpse.GetLifeDates() : corpse.GetExpectedDeathDate();
}
