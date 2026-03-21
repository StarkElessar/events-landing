namespace Site.Core.Models;

public class Transfer
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;

    // Domain used to resolve this Transfer per deployment instance
    // e.g. "events.autobus.ru"
    public string Domain { get; set; } = string.Empty;

    public string? LogoUrl { get; set; }

    // Brand color gradient (start == end for flat color)
    public string BrandColorStart { get; set; } = "#007bff";
    public string BrandColorEnd { get; set; } = "#007bff";

    // Primary color gradient
    public string PrimaryColorStart { get; set; } = "#6f42c1";
    public string PrimaryColorEnd { get; set; } = "#6f42c1";

    public string Phone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string LegalAddress { get; set; } = string.Empty;
    public string TransportType { get; set; } = string.Empty;

    public string? INN { get; set; }
    public string? OGRN { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<Event> Events { get; set; } = new List<Event>();
}
