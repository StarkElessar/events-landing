namespace Site.Core.ViewModels;

/// <summary>
/// Base view model for landing pages.
/// Carries typed CSS custom properties that are rendered server-side in _Layout.cshtml.
/// </summary>
public abstract class BaseViewModel
{
	public string Title { get; init; } = string.Empty;

	public string? MetaDescription { get; init; }

	public string BrandColorStart { get; init; } = "#007bff";

	public string BrandColorEnd { get; init; } = "#007bff";

	public string PrimaryColorStart { get; init; } = "#6f42c1";

	public string PrimaryColorEnd { get; init; } = "#6f42c1";
}
