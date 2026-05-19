using VictorFrye.MicrosoftGraveyard.CommandLine.Models;

namespace VictorFrye.MicrosoftGraveyard.CommandLine.Services;

/// <summary>
/// Produces obituary text for console output and future file-based workflows.
/// </summary>
public sealed class ObitWriter
{
    /// <summary>
    /// Generates the obituary text for a corpse entry.
    /// </summary>
    /// <param name="corpse">The corpse being memorialized.</param>
    /// <param name="today">The date used to calculate past and future intervals.</param>
    /// <returns>The generated obituary text.</returns>
    public string GenerateObituary(Corpse corpse, DateOnly today)
    {
        ArgumentNullException.ThrowIfNull(corpse);

        string displayName = GetDisplayName(corpse);
        DateOnly deathDate = corpse.DeathDate ?? DateOnly.MinValue;
        bool isDead = deathDate <= today;

        string content;
        if (isDead)
        {
            (int age, string period) = GetAge(deathDate, today);
            string message = age == 0 ? "today" : $"{age} {period} ago";
            content = $"Killed by Microsoft {message}, {displayName} was {corpse.Description}.";
        }
        else
        {
            (int age, string period) = GetAge(today, deathDate);
            content = $"To be killed by Microsoft in {age} {period}, {displayName} is {corpse.Description}.";
        }

        if (isDead && corpse.BirthDate is { } birthDate)
        {
            (int age, string period) = GetAge(birthDate, deathDate);
            content += $" It was {age} {period} old.";
        }

        return content;
    }

    private static string GetDisplayName(Corpse corpse)
    {
        return string.IsNullOrWhiteSpace(corpse.Qualifier) ? corpse.Name : $"{corpse.Name} ({corpse.Qualifier})";
    }

    private static (int Age, string Period) GetAge(DateOnly start, DateOnly end)
    {
        int years = end.Year - start.Year;
        if (end.Month < start.Month || (end.Month == start.Month && end.Day < start.Day))
        {
            years--;
        }

        if (years >= 1)
        {
            return (years, years == 1 ? "year" : "years");
        }

        int months = end.Month - start.Month + (12 * (end.Year - start.Year));
        if (months >= 1)
        {
            return (months, months == 1 ? "month" : "months");
        }

        int days = end.Day - start.Day;
        return (days, days == 1 ? "day" : "days");
    }
}
