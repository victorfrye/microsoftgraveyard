using System.Collections.Generic;

using VictorFrye.MicrosoftGraveyard.CommandLine.Validation;

namespace VictorFrye.MicrosoftGraveyard.CommandLine.Tests;

public sealed class ValidationResultTests
{
    [Fact]
    public void ValidationResult_IsValid_True_WhenNoErrors()
    {
        ValidationResult result = new(true, new List<string>(), new List<string>());

        Assert.True(result.IsValid);
    }

    [Fact]
    public void ValidationResult_IsValid_False_WhenHasErrors()
    {
        ValidationResult result = new(false, new List<string> { "Name is required." }, new List<string>());

        Assert.False(result.IsValid);
    }
}
