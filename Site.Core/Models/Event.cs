using System.ComponentModel.DataAnnotations.Schema;

namespace Site.Core.Models;

public class Event
{
    public int Id { get; set; }

    public int TransferId { get; set; }
    public Transfer? Transfer { get; set; }

    public string Slug { get; set; } = string.Empty;

    // SEO
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

    // Page content
    public string TitlePage { get; set; } = string.Empty;

    // Overridable design fields (null = inherit from Transfer)
    public string? TopLogoUrl { get; set; }

    public string? BottomLogoUrl { get; set; }

    public string? BrandColorStart { get; set; }

    public string? BrandColorEnd { get; set; }

    public string? PrimaryColorStart { get; set; }

    public string? PrimaryColorEnd { get; set; }

    public bool IsPublished { get; set; }

    public bool IsDefault { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Computed properties — inherit from Transfer when null
    [NotMapped]
    public string EffectiveBrandColorStart => BrandColorStart ?? Transfer?.BrandColorStart ?? "#007bff";

    [NotMapped]
    public string EffectiveBrandColorEnd => BrandColorEnd ?? Transfer?.BrandColorEnd ?? "#007bff";

    [NotMapped]
    public string EffectivePrimaryColorStart => PrimaryColorStart ?? Transfer?.PrimaryColorStart ?? "#6f42c1";

    [NotMapped]
    public string EffectivePrimaryColorEnd => PrimaryColorEnd ?? Transfer?.PrimaryColorEnd ?? "#6f42c1";

    [NotMapped]
    public string ContactPhone => Transfer?.Phone ?? string.Empty;

    [NotMapped]
    public string ContactEmail => Transfer?.Email ?? string.Empty;
}
