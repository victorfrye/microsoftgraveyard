using VictorFrye.MicrosoftGraveyard.CommandLine.Models;
using VictorFrye.MicrosoftGraveyard.CommandLine.Services;

namespace VictorFrye.MicrosoftGraveyard.CommandLine.Tests;

public sealed class ObitWriterTests
{
    private readonly ObitWriter writer = new();

    [Fact]
    public void GenerateObituary_DeadProduct_NoQualifier_NoBirthDate_ReturnsKilledMessage()
    {
        Corpse corpse = TestCorpseFactory.Create(deathDate: new DateOnly(2024, 1, 15));
        DateOnly today = new(2026, 1, 15);

        string obituary = writer.GenerateObituary(corpse, today);

        Assert.Equal("Killed by Microsoft 2 years ago, Test Product was a test product.", obituary);
    }

    [Fact]
    public void GenerateObituary_DeadProduct_WithQualifier_IncludesQualifierInName()
    {
        Corpse corpse = TestCorpseFactory.Create(name: "Windows Phone", qualifier: "Original", deathDate: new DateOnly(2024, 5, 19));
        DateOnly today = new(2026, 5, 19);

        string obituary = writer.GenerateObituary(corpse, today);

        Assert.Equal("Killed by Microsoft 2 years ago, Windows Phone (Original) was a test product.", obituary);
    }

    [Fact]
    public void GenerateObituary_DeadProduct_WithBirthDate_IncludesAgeAtDeath()
    {
        Corpse corpse = TestCorpseFactory.Create(birthDate: new DateOnly(2018, 1, 1), deathDate: new DateOnly(2020, 1, 1));
        DateOnly today = new(2022, 1, 1);

        string obituary = writer.GenerateObituary(corpse, today);

        Assert.Equal("Killed by Microsoft 2 years ago, Test Product was a test product. It was 2 years old.", obituary);
    }

    [Fact]
    public void GenerateObituary_FutureProduct_ReturnsToBeSentence()
    {
        Corpse corpse = TestCorpseFactory.Create(deathDate: new DateOnly(2026, 2, 15));
        DateOnly today = new(2026, 1, 15);

        string obituary = writer.GenerateObituary(corpse, today);

        Assert.Equal("To be killed by Microsoft in 1 month, Test Product is a test product.", obituary);
    }

    [Fact]
    public void GenerateObituary_DeadToday_SaysKilledToday()
    {
        DateOnly today = new(2026, 5, 19);
        Corpse corpse = TestCorpseFactory.Create(deathDate: today);

        string obituary = writer.GenerateObituary(corpse, today);

        Assert.Equal("Killed by Microsoft today, Test Product was a test product.", obituary);
    }

    [Fact]
    public void GenerateObituary_DeadOneYear_SingularYearWording()
    {
        Corpse corpse = TestCorpseFactory.Create(deathDate: new DateOnly(2025, 5, 19));
        DateOnly today = new(2026, 5, 19);

        string obituary = writer.GenerateObituary(corpse, today);

        Assert.Contains("1 year ago", obituary);
    }

    [Fact]
    public void GenerateObituary_DeadMultipleYears_PluralYearWording()
    {
        Corpse corpse = TestCorpseFactory.Create(deathDate: new DateOnly(2023, 5, 19));
        DateOnly today = new(2026, 5, 19);

        string obituary = writer.GenerateObituary(corpse, today);

        Assert.Contains("3 years ago", obituary);
    }

    [Fact]
    public void GenerateObituary_DeadLessThanYear_ReturnsMonths()
    {
        Corpse corpse = TestCorpseFactory.Create(deathDate: new DateOnly(2026, 1, 15));
        DateOnly today = new(2026, 4, 15);

        string obituary = writer.GenerateObituary(corpse, today);

        Assert.Equal("Killed by Microsoft 3 months ago, Test Product was a test product.", obituary);
    }

    [Fact]
    public void GenerateObituary_DeadLessThanMonth_ReturnsDays()
    {
        Corpse corpse = TestCorpseFactory.Create(deathDate: new DateOnly(2026, 5, 1));
        DateOnly today = new(2026, 5, 10);

        string obituary = writer.GenerateObituary(corpse, today);

        Assert.Equal("Killed by Microsoft 9 days ago, Test Product was a test product.", obituary);
    }

    [Fact]
    public void GenerateObituary_NullCorpse_ThrowsArgumentNullException()
    {
        DateOnly today = new(2026, 5, 19);

        Assert.Throws<ArgumentNullException>(() => writer.GenerateObituary(null!, today));
    }
}
