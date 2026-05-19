using System.Collections.Generic;

namespace VictorFrye.MicrosoftGraveyard.CommandLine.Validation;

/// <summary>
/// Represents the outcome of validating a corpse entry before it is saved.
/// </summary>
/// <param name="IsValid">Indicates whether validation completed without errors.</param>
/// <param name="Errors">The validation errors that must be resolved before saving.</param>
/// <param name="Warnings">The non-blocking validation warnings surfaced to the user.</param>
public sealed record ValidationResult(bool IsValid, IReadOnlyList<string> Errors, IReadOnlyList<string> Warnings);
