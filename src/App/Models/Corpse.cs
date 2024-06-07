namespace VictorFrye.Graveyard.Models;

using System.Text;

using Microsoft.FluentUI.AspNetCore.Components;

public class Corpse(string name, string? qualifier, DateOnly? birthDate, DateOnly deathDate, string description, string link)
{
    public string Name { get; init; } = name;
    public string? Qualifier { get; init; } = qualifier;
    public DateOnly? BirthDate { get; init; } = birthDate;
    public DateOnly DeathDate { get; init; } = deathDate;
    public string Description { get; init; } = description;
    public string Link { get; init; } = link;

    public bool IsDead(DateOnly today) => DeathDate <= today;

    public string GetExpectedDeathDate() => $"{DeathDate:MMMM yyyy}";

    public string GetLifeDates() => BirthDate is null ? $"{DeathDate:yyyy}" : $"{BirthDate.Value:yyyy} - {DeathDate:yyyy}";

    public string GetFullName() => Qualifier is null ? Name : $"{Name} ({Qualifier})";

    public string GetObituary(DateOnly today)
    {
        var obituary = new StringBuilder();
        var isDead = IsDead(today);

        if (isDead)
        {
            var (age, period) = GetAge(DeathDate, today);
            var message = age == 0 ? "today" : $"{age} {period} ago";
            obituary.Append($"Killed by Microsoft {message}, ");
        }
        else
        {
            var (age, period) = GetAge(today, DeathDate);
            obituary.Append($"To be killed by Microsoft in {age} {period}, ");
        }

        obituary.Append($"{Name} {(isDead ? "was" : "is")} {Description}.");

        if (isDead && BirthDate is not null)
        {
            var (age, period) = GetAge(BirthDate.Value, DeathDate);
            obituary.Append($" It was {age} {period} old.");
        }

        return obituary.ToString();
    }

    internal static (int Age, string Period) GetAge(DateOnly start, DateOnly end)
    {
        var years = end.Year - start.Year;

        if (end.Month < start.Month || (end.Month == start.Month && end.Day < start.Day))
        {
            years--;
        }

        if (years >= 1)
        {
            return (years, years == 1 ? "year" : "years");
        }

        var months = end.Month - start.Month + (12 * (end.Year - start.Year));

        if (months >= 1)
        {
            return (months, months == 1 ? "month" : "months");
        }

        var days = end.Day - start.Day;

        return (days, days == 1 ? "day" : "days");
    }
}
