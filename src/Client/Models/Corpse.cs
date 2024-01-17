using System.Text;

namespace VictorFrye.MicrosoftGraveyard.Client.Models;

public class Corpse(string slug, string name, string? subtitle, DateOnly? birthDate, DateOnly deathDate, string description, string link)
{
    public string Slug { get; init; } = slug;
    public string Name { get; init; } = name;
    public string? Subtitle { get; init; } = subtitle;
    public DateOnly? BirthDate { get; init; } = birthDate;

    public DateOnly DeathDate { get; init; } = deathDate;
    public string Description { get; init; } = description;
    public string Link { get; init; } = link;

    public bool IsDead() => DeathDate <= DateOnly.FromDateTime(DateTime.Now);

    public int? GetAge()
    {
        if (BirthDate is null)
        {
            return null;
        }

        var age = DeathDate.Year - BirthDate.Value.Year;

        if (DeathDate < BirthDate.Value.AddYears(age))
        {
            age--;
        }

        return age;
    }

    public string GetExpectedDeathDate() => $"{DeathDate:MMMM yyyy}";

    public string GetLifeDates() => BirthDate is null ? $"{DeathDate:yyyy}" : $"{BirthDate.Value:yyyy} - {DeathDate:yyyy}";

    public string GetFullName() => Subtitle is null ? Name : $"{Name} ({Subtitle})";

    public string GetObituary()
    {
        var obituary = new StringBuilder();

        obituary.Append($"{Name} {(IsDead() ? "was" : "is")} {Description}.");

        return obituary.ToString();
    }
}