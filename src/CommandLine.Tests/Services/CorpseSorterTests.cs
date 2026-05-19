using System.Collections.Generic;
using System.Linq;

using VictorFrye.MicrosoftGraveyard.CommandLine.Models;
using VictorFrye.MicrosoftGraveyard.CommandLine.Services;

namespace VictorFrye.MicrosoftGraveyard.CommandLine.Tests;

public sealed class CorpseSorterTests
{
    private readonly CorpseSorter sorter = new();

    [Fact]
    public void Sort_EmptyList_ReturnsEmpty()
    {
        List<Corpse> corpses = [];

        List<Corpse> sorted = sorter.Sort(corpses).ToList();

        Assert.Empty(sorted);
    }

    [Fact]
    public void Sort_SingleItem_ReturnsSame()
    {
        Corpse corpse = TestCorpseFactory.Create();
        List<Corpse> corpses = [corpse];

        List<Corpse> sorted = sorter.Sort(corpses).ToList();

        Assert.Single(sorted);
        Assert.Same(corpse, sorted[0]);
    }

    [Fact]
    public void Sort_MultipleItems_OrdersByDeathDateDescending()
    {
        List<Corpse> corpses =
        [
            TestCorpseFactory.Create(name: "Alpha", deathDate: new DateOnly(2020, 1, 1)),
            TestCorpseFactory.Create(name: "Bravo", deathDate: new DateOnly(2022, 1, 1)),
            TestCorpseFactory.Create(name: "Charlie", deathDate: new DateOnly(2021, 1, 1)),
        ];

        List<Corpse> sorted = sorter.Sort(corpses).ToList();

        Assert.Equal(["Bravo", "Charlie", "Alpha"], sorted.Select(corpse => corpse.Name).ToArray());
    }

    [Fact]
    public void Sort_SameDeathDate_OrdersByNameAscending()
    {
        List<Corpse> corpses =
        [
            TestCorpseFactory.Create(name: "Beta", deathDate: new DateOnly(2020, 1, 1)),
            TestCorpseFactory.Create(name: "Alpha", deathDate: new DateOnly(2020, 1, 1)),
        ];

        List<Corpse> sorted = sorter.Sort(corpses).ToList();

        Assert.Equal(["Alpha", "Beta"], sorted.Select(corpse => corpse.Name).ToArray());
    }

    [Fact]
    public void Sort_NullDeathDate_TreatedAsMinValue()
    {
        Corpse dated = TestCorpseFactory.Create(name: "Dated", deathDate: new DateOnly(2020, 1, 1));
        Corpse undated = TestCorpseFactory.Create(name: "Undated");
        undated.DeathDate = null;
        List<Corpse> corpses = [undated, dated];

        List<Corpse> sorted = sorter.Sort(corpses).ToList();

        Assert.Equal(["Dated", "Undated"], sorted.Select(corpse => corpse.Name).ToArray());
    }

    [Fact]
    public void Sort_NullInput_ThrowsArgumentNullException()
    {
        Assert.Throws<ArgumentNullException>(() => sorter.Sort(null!));
    }

    [Fact]
    public void IsAlreadySorted_AlreadySorted_ReturnsTrue()
    {
        List<Corpse> corpses =
        [
            TestCorpseFactory.Create(name: "Alpha", deathDate: new DateOnly(2022, 1, 1)),
            TestCorpseFactory.Create(name: "Beta", deathDate: new DateOnly(2021, 1, 1)),
        ];

        bool isSorted = sorter.IsAlreadySorted(corpses);

        Assert.True(isSorted);
    }

    [Fact]
    public void IsAlreadySorted_NotSorted_ReturnsFalse()
    {
        List<Corpse> corpses =
        [
            TestCorpseFactory.Create(name: "Beta", deathDate: new DateOnly(2021, 1, 1)),
            TestCorpseFactory.Create(name: "Alpha", deathDate: new DateOnly(2022, 1, 1)),
        ];

        bool isSorted = sorter.IsAlreadySorted(corpses);

        Assert.False(isSorted);
    }

    [Fact]
    public void IsAlreadySorted_EmptyList_ReturnsTrue()
    {
        List<Corpse> corpses = [];

        bool isSorted = sorter.IsAlreadySorted(corpses);

        Assert.True(isSorted);
    }

    [Fact]
    public void IsAlreadySorted_NullInput_ThrowsArgumentNullException()
    {
        Assert.Throws<ArgumentNullException>(() => sorter.IsAlreadySorted(null!));
    }

    [Fact]
    public void GetDiff_IdenticalLists_ReturnsNull()
    {
        List<Corpse> before =
        [
            TestCorpseFactory.Create(name: "Alpha", deathDate: new DateOnly(2022, 1, 1)),
            TestCorpseFactory.Create(name: "Beta", deathDate: new DateOnly(2021, 1, 1)),
        ];

        List<Corpse> after =
        [
            TestCorpseFactory.Create(name: "Alpha", deathDate: new DateOnly(2022, 1, 1)),
            TestCorpseFactory.Create(name: "Beta", deathDate: new DateOnly(2021, 1, 1)),
        ];

        string? diff = sorter.GetDiff(before, after);

        Assert.Null(diff);
    }

    [Fact]
    public void GetDiff_OrderChanged_ReturnsDiffDescription()
    {
        List<Corpse> before =
        [
            TestCorpseFactory.Create(name: "Beta", deathDate: new DateOnly(2020, 1, 1)),
            TestCorpseFactory.Create(name: "Alpha", deathDate: new DateOnly(2020, 1, 1)),
        ];
        List<Corpse> after = sorter.Sort(before).ToList();

        string? diff = sorter.GetDiff(before, after);

        Assert.NotNull(diff);
        Assert.Contains("Moved 'Alpha' from position 2 to 1.", diff);
        Assert.Contains("Moved 'Beta' from position 1 to 2.", diff);
    }

    [Fact]
    public void GetDiff_NullBefore_ThrowsArgumentNullException()
    {
        List<Corpse> after = [TestCorpseFactory.Create()];

        Assert.Throws<ArgumentNullException>(() => sorter.GetDiff(null!, after));
    }

    [Fact]
    public void GetDiff_NullAfter_ThrowsArgumentNullException()
    {
        List<Corpse> before = [TestCorpseFactory.Create()];

        Assert.Throws<ArgumentNullException>(() => sorter.GetDiff(before, null!));
    }
}
