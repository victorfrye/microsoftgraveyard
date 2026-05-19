using VictorFrye.MicrosoftGraveyard.CommandLine.Models;

namespace VictorFrye.MicrosoftGraveyard.CommandLine.Tests;

internal static class TestCorpseFactory
{
    public static Corpse Create(
        string name = "Test Product",
        string? qualifier = null,
        DateOnly? birthDate = null,
        DateOnly? deathDate = null,
        string description = "a test product",
        string link = "https://example.com/test") =>
        new()
        {
            Name = name,
            Qualifier = qualifier,
            BirthDate = birthDate,
            DeathDate = deathDate ?? new DateOnly(2020, 1, 1),
            Description = description,
            Link = link,
        };
}
