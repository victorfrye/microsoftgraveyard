using System.Collections.Generic;

using VictorFrye.MicrosoftGraveyard.CommandLine.Models;
using VictorFrye.MicrosoftGraveyard.CommandLine.Validation;

namespace VictorFrye.MicrosoftGraveyard.CommandLine.Tests;

public sealed class CorpseValidatorTests
{
    private readonly CorpseValidator validator = new();

    [Fact]
    public void ValidateForAdd_ValidCorpse_EmptyExisting_IsValid()
    {
        Corpse corpse = TestCorpseFactory.Create();

        ValidationResult result = validator.ValidateForAdd(corpse, []);

        Assert.True(result.IsValid);
        Assert.Empty(result.Errors);
        Assert.Empty(result.Warnings);
    }

    [Fact]
    public void ValidateForAdd_ValidCorpse_ExistingList_IsValid()
    {
        Corpse corpse = TestCorpseFactory.Create(name: "New Product");
        List<Corpse> existing = [TestCorpseFactory.Create(name: "Existing Product")];

        ValidationResult result = validator.ValidateForAdd(corpse, existing);

        Assert.True(result.IsValid);
        Assert.Empty(result.Errors);
    }

    [Fact]
    public void ValidateForAdd_MissingName_HasError()
    {
        Corpse corpse = TestCorpseFactory.Create();
        corpse.Name = string.Empty;

        ValidationResult result = validator.ValidateForAdd(corpse, []);

        Assert.False(result.IsValid);
        Assert.Contains("Name is required.", result.Errors);
    }

    [Fact]
    public void ValidateForAdd_MissingDeathDate_HasError()
    {
        Corpse corpse = TestCorpseFactory.Create();
        corpse.DeathDate = null;

        ValidationResult result = validator.ValidateForAdd(corpse, []);

        Assert.False(result.IsValid);
        Assert.Contains("Death date is required.", result.Errors);
    }

    [Fact]
    public void ValidateForAdd_MissingDescription_HasError()
    {
        Corpse corpse = TestCorpseFactory.Create();
        corpse.Description = string.Empty;

        ValidationResult result = validator.ValidateForAdd(corpse, []);

        Assert.False(result.IsValid);
        Assert.Contains("Description is required.", result.Errors);
    }

    [Fact]
    public void ValidateForAdd_InvalidLink_HasError()
    {
        Corpse corpse = TestCorpseFactory.Create(link: "not-a-valid-link");

        ValidationResult result = validator.ValidateForAdd(corpse, []);

        Assert.False(result.IsValid);
        Assert.Contains("Link must be a valid absolute URL.", result.Errors);
    }

    [Fact]
    public void ValidateForAdd_RelativeLink_HasError()
    {
        Corpse corpse = TestCorpseFactory.Create(link: "/products/test-product");

        ValidationResult result = validator.ValidateForAdd(corpse, []);

        Assert.False(result.IsValid);
        Assert.Contains("Link must be a valid absolute URL.", result.Errors);
    }

    [Fact]
    public void ValidateForAdd_DuplicateName_HasError()
    {
        Corpse corpse = TestCorpseFactory.Create(name: "Clippy");
        List<Corpse> existing = [TestCorpseFactory.Create(name: "Clippy")];

        ValidationResult result = validator.ValidateForAdd(corpse, existing);

        Assert.False(result.IsValid);
        Assert.Contains("A corpse named 'Clippy' already exists.", result.Errors);
    }

    [Fact]
    public void ValidateForAdd_DuplicateNameCaseInsensitive_HasError()
    {
        Corpse corpse = TestCorpseFactory.Create(name: "Clippy");
        List<Corpse> existing = [TestCorpseFactory.Create(name: "clippy")];

        ValidationResult result = validator.ValidateForAdd(corpse, existing);

        Assert.False(result.IsValid);
        Assert.Contains("A corpse named 'Clippy' already exists.", result.Errors);
    }

    [Fact]
    public void ValidateForAdd_BirthDateAfterDeathDate_HasError()
    {
        Corpse corpse = TestCorpseFactory.Create(birthDate: new DateOnly(2020, 1, 2), deathDate: new DateOnly(2020, 1, 1));

        ValidationResult result = validator.ValidateForAdd(corpse, []);

        Assert.False(result.IsValid);
        Assert.Contains("Birth date must be earlier than death date.", result.Errors);
    }

    [Fact]
    public void ValidateForAdd_BirthDateSameAsDeathDate_HasError()
    {
        DateOnly sameDay = new(2020, 1, 1);
        Corpse corpse = TestCorpseFactory.Create(birthDate: sameDay, deathDate: sameDay);

        ValidationResult result = validator.ValidateForAdd(corpse, []);

        Assert.False(result.IsValid);
        Assert.Contains("Birth date must be earlier than death date.", result.Errors);
    }

    [Fact]
    public void ValidateForAdd_WikipediaLink_HasWarning_IsValid()
    {
        Corpse corpse = TestCorpseFactory.Create(link: "https://en.wikipedia.org/wiki/Clippy");

        ValidationResult result = validator.ValidateForAdd(corpse, []);

        Assert.True(result.IsValid);
        Assert.Empty(result.Errors);
        Assert.Contains("Wikipedia links are discouraged. Prefer a primary or higher-quality secondary source.", result.Warnings);
    }

    [Fact]
    public void ValidateForAdd_WikipediaLink_CaseInsensitive_HasWarning()
    {
        Corpse corpse = TestCorpseFactory.Create(link: "https://EN.WIKIPEDIA.ORG/wiki/Clippy");

        ValidationResult result = validator.ValidateForAdd(corpse, []);

        Assert.Contains("Wikipedia links are discouraged. Prefer a primary or higher-quality secondary source.", result.Warnings);
    }

    [Fact]
    public void ValidateForAdd_NullCorpse_ThrowsArgumentNullException()
    {
        Assert.Throws<ArgumentNullException>(() => validator.ValidateForAdd(null!, []));
    }

    [Fact]
    public void ValidateForAdd_NullExisting_ThrowsArgumentNullException()
    {
        Corpse corpse = TestCorpseFactory.Create();

        Assert.Throws<ArgumentNullException>(() => validator.ValidateForAdd(corpse, null!));
    }

    [Fact]
    public void ValidateForAdd_MultipleErrors_ReturnsAllErrors()
    {
        Corpse corpse = TestCorpseFactory.Create();
        corpse.Name = string.Empty;
        corpse.DeathDate = null;
        corpse.Description = string.Empty;
        corpse.Link = "bad-link";

        ValidationResult result = validator.ValidateForAdd(corpse, []);

        Assert.False(result.IsValid);
        Assert.Equal(4, result.Errors.Count);
        Assert.Contains("Name is required.", result.Errors);
        Assert.Contains("Death date is required.", result.Errors);
        Assert.Contains("Description is required.", result.Errors);
        Assert.Contains("Link must be a valid absolute URL.", result.Errors);
    }
}
