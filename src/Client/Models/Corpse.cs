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

    private readonly DateOnly _now = DateOnly.FromDateTime(DateTime.Now);

    public bool IsDead() => DeathDate <= _now;

    public string GetExpectedDeathDate() => $"{DeathDate:MMMM yyyy}";

    public string GetLifeDates() => BirthDate is null ? $"{DeathDate:yyyy}" : $"{BirthDate.Value:yyyy} - {DeathDate:yyyy}";

    public string GetFullName() => Subtitle is null ? Name : $"{Name} ({Subtitle})";

    public string GetObituary()
    {
        var obituary = new StringBuilder();

        if (IsDead())
        {
            var timeDead = GetAge(DeathDate, _now);
            var message = timeDead.Value.Age == 0 ? "today" : $"{timeDead.Value.Age} {timeDead.Value.Period} ago";
            obituary.Append($"Killed by Microsoft {message}, ");
        }
        else
        {
            var execution = GetAge(_now, DeathDate);
            obituary.Append($"To be killed by Microsoft in {execution.Value.Age} {execution.Value.Period}, ");
        }

        obituary.Append($"{Name} {(IsDead() ? "was" : "is")} {Description}.");

        if (IsDead() && BirthDate is not null)
        {
            var timeLived = GetAge(BirthDate.Value, DeathDate);
            obituary.Append($" It was {timeLived.Value.Age} {timeLived.Value.Period} old.");
        }

        return obituary.ToString();
    }

    private static (int Age, string Period)? GetAge(DateOnly start, DateOnly end)
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

        if (end.Month == start.Month && end.Day < start.Day)
        {
            months--;
        }

        if (months >= 1)
        {
            return (months, months == 1 ? "month" : "months");
        }

        var days = end.Day - start.Day;

        return (days, days == 1 ? "day" : "days");
    }
}
