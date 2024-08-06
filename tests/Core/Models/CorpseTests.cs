using Microsoft.Extensions.Time.Testing;

using VictorFrye.MicrosoftGraveyard.Models;

namespace VictorFrye.MicrosoftGraveyard.Tests.Unit.Models;

public class CorpseTests
{
    private static readonly DateOnly GivenDate = new(2024, 1, 22);

    [Fact]
    public void ShouldReturnIsAlive()
    {
        // Arrange
        var dateToBeKilled = GivenDate.AddYears(1);

        // Act
        var actual = NewMockCorpse(deathDate: dateToBeKilled).IsDead(GivenDate);

        // Assert
        Assert.False(actual);
    }

    [Fact]
    public void ShouldReturnIsDead()
    {
        // Arrange
        var dateToBeKilled = GivenDate.AddYears(-1);

        // Act
        var actual = NewMockCorpse(deathDate: dateToBeKilled).IsDead(GivenDate);

        // Assert
        Assert.True(actual);
    }

    [Fact]
    public void ShouldReturnUnqualifiedNameWhenQualifierIsNull()
    {
        // Arrange
        var expected = "Windows XP";

        // Act
        var actual = NewMockCorpse(name: "Windows XP", qualifier: null).GetFullName();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void ShouldReturnQualifiedFullName()
    {
        // Arrange
        var expected = "Xbox (original console)";

        // Act
        var actual = NewMockCorpse(name: "Xbox", qualifier: "original console").GetFullName();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void ShouldReturnFormattedExpectedDeathDate()
    {
        // Arrange
        var expected = "January 2024";

        // Act
        var actual = NewMockCorpse(deathDate: new DateOnly(2024, 1, 25)).GetExpectedDeathDate();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void ShouldReturnLifeDateRangeWhenBirthDateKnown()
    {
        // Arrange
        var expected = "2023 - 2024";

        // Act
        var actual = NewMockCorpse(birthDate: new DateOnly(2023, 3, 10), deathDate: new DateOnly(2024, 1, 25)).GetLifeDates();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void ShouldReturnOnlyDeathYearWhenBirthUnknown()
    {
        // Arrange
        var expected = "2024";

        // Act
        var actual = NewMockCorpse(birthDate: null, deathDate: new DateOnly(2024, 1, 25)).GetLifeDates();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void ShouldReturnObituaryWhenKilledTodayAndBirthKnown()
    {
        // Arrange
        var expected = "Killed by Microsoft today, Skype was a video calling service. It was 1 year old.";

        // Act
        var actual = NewMockCorpse(name: "Skype", birthDate: GivenDate.AddYears(-1), deathDate: GivenDate, description: "a video calling service").GetObituary(GivenDate);

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void ShouldReturnObituaryWhenKilledYesterdayAndBirthUnknown()
    {
        // Arrange
        var expected = "Killed by Microsoft 1 day ago, Skype was a video calling service.";

        // Act
        var actual = NewMockCorpse(name: "Skype", birthDate: null, deathDate: GivenDate.AddDays(-1), description: "a video calling service").GetObituary(GivenDate);

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void ShouldReturnObituaryWhenKilledEightDaysAgo()
    {
        // Arrange
        var expected = "Killed by Microsoft 8 days ago, Xbox 360 Store was a game marketplace.";

        // Act
        var actual = NewMockCorpse(name: "Xbox 360 Store", birthDate: null, deathDate: GivenDate.AddDays(-8), description: "a game marketplace").GetObituary(GivenDate);

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void ShouldReturnObituaryWhenKilledTwentySixDaysAgoAcrossMonthBoundary()
    {
        // Arrange
        var expected = "Killed by Microsoft 1 month ago, Xbox 360 Store was a game marketplace.";

        // Act
        var actual = NewMockCorpse(name: "Xbox 360 Store", birthDate: null, deathDate: GivenDate.AddDays(-26), description: "a game marketplace").GetObituary(GivenDate);

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void ShouldReturnObituaryWhenKilledTwoDaysAgoAndBirthFourMonthsAgo()
    {
        // Arrange
        var expected = "Killed by Microsoft 2 days ago, Skype was a video calling service. It was 4 months old.";

        // Act
        var actual = NewMockCorpse(name: "Skype", birthDate: GivenDate.AddMonths(-4), deathDate: GivenDate.AddDays(-2), description: "a video calling service").GetObituary(GivenDate);

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void ShouldReturnObituaryWhenKilledLastMonthAndTwoDaysAgoAndBornLastDecade()
    {
        // Arrange
        var expected = "Killed by Microsoft 1 month ago, Skype was a video calling service. It was 9 years old.";

        // Act
        var actual = NewMockCorpse(name: "Skype", birthDate: GivenDate.AddYears(-10), deathDate: GivenDate.AddMonths(-1).AddDays(-2), description: "a video calling service").GetObituary(GivenDate);

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void ShouldReturnObituaryWhenToBeKilledNextYear()
    {
        // Arrange
        var expected = "To be killed by Microsoft in 1 year, Skype is a video calling service.";

        // Act
        var actual = NewMockCorpse(name: "Skype", birthDate: GivenDate, deathDate: GivenDate.AddYears(1), description: "a video calling service").GetObituary(GivenDate);

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void ShouldReturnObituaryWhenToBeKilledNextMonth()
    {
        // Arrange
        var expected = "To be killed by Microsoft in 1 month, Skype is a video calling service.";

        // Act
        var actual = NewMockCorpse(name: "Skype", birthDate: GivenDate, deathDate: GivenDate.AddMonths(1), description: "a video calling service").GetObituary(GivenDate);

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void ShouldReturnObituaryWhenToBeKilledInTwoMonthsMinusADay()
    {
        // Arrange
        var expected = "To be killed by Microsoft in 2 months, Skype is a video calling service.";

        // Act
        var actual = NewMockCorpse(name: "Skype", birthDate: GivenDate, deathDate: GivenDate.AddMonths(2), description: "a video calling service").GetObituary(GivenDate);

        // Assert
        Assert.Equal(expected, actual);
    }

    private static Corpse NewMockCorpse(
        string name = "Test Corpse",
        string? qualifier = null,
        DateOnly? birthDate = null,
        DateOnly? deathDate = null,
        string description = "nice words said",
        string link = "https://somelink.com")
    {
        return new(
            name,
            qualifier,
            birthDate,
            deathDate ?? GivenDate,
            description,
            link);
    }
}
