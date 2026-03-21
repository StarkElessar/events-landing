using Microsoft.EntityFrameworkCore;
using Site.Core.Models;

namespace CMS.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Transfer> Transfers => Set<Transfer>();
    public DbSet<Event> Events => Set<Event>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Transfer>(entity =>
        {
            entity.HasIndex(t => t.Slug).IsUnique();
            entity.HasIndex(t => t.Domain).IsUnique();
            entity.Property(t => t.Name).HasMaxLength(200);
            entity.Property(t => t.Slug).HasMaxLength(200);
            entity.Property(t => t.Domain).HasMaxLength(253);
            entity.Property(t => t.BrandColorStart).HasMaxLength(9);
            entity.Property(t => t.BrandColorEnd).HasMaxLength(9);
            entity.Property(t => t.PrimaryColorStart).HasMaxLength(9);
            entity.Property(t => t.PrimaryColorEnd).HasMaxLength(9);
        });

        modelBuilder.Entity<Event>(entity =>
        {
            entity.HasIndex(e => e.Slug).IsUnique();
            entity.Property(e => e.Slug).HasMaxLength(200);
            entity.Property(e => e.Title).HasMaxLength(300);
            entity.Property(e => e.TitlePage).HasMaxLength(300);
            entity.Property(e => e.BrandColorStart).HasMaxLength(9);
            entity.Property(e => e.BrandColorEnd).HasMaxLength(9);
            entity.Property(e => e.PrimaryColorStart).HasMaxLength(9);
            entity.Property(e => e.PrimaryColorEnd).HasMaxLength(9);

            entity.HasOne(e => e.Transfer)
                  .WithMany(t => t.Events)
                  .HasForeignKey(e => e.TransferId)
                  .OnDelete(DeleteBehavior.Restrict);
        });

        Seed(modelBuilder);
    }

    private static void Seed(ModelBuilder modelBuilder)
    {
        var now = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        modelBuilder.Entity<Transfer>().HasData(
            new Transfer
            {
                Id = 1,
                Name = "Автобус.ру",
                Slug = "avtobusru",
                Domain = "events.autobus.ru",
                BrandColorStart = "#e31e24",
                BrandColorEnd = "#c4171c",
                PrimaryColorStart = "#e31e24",
                PrimaryColorEnd = "#e31e24",
                Phone = "+7 (800) 555-35-35",
                Email = "info@avtobus.ru",
                LegalAddress = "г. Москва, ул. Примерная, д. 1",
                TransportType = "Автобус",
                INN = "7700000001",
                OGRN = "1027700000001",
                CreatedAt = now,
                UpdatedAt = now
            },
            new Transfer
            {
                Id = 2,
                Name = "Avtobus.ru",
                Slug = "avtobusru-en",
                Domain = "events.avtobus1.ru",
                BrandColorStart = "#1a73e8",
                BrandColorEnd = "#1557b0",
                PrimaryColorStart = "#34a853",
                PrimaryColorEnd = "#2d9249",
                Phone = "+7 (800) 555-35-36",
                Email = "info@avtobusru.com",
                LegalAddress = "г. Москва, ул. Другая, д. 2",
                TransportType = "Минивэн",
                INN = "7700000002",
                OGRN = "1027700000002",
                CreatedAt = now,
                UpdatedAt = now
            }
        );

        modelBuilder.Entity<Event>().HasData(
            new Event
            {
                Id = 1,
                TransferId = 1,
                Slug = "rsn-2026",
                Title = "Трансфер на РСН 2026 — Автобус.ру",
                Description = "Комфортный трансфер на Российскую строительную неделю 2026. Автобус.ру — надёжный перевозчик.",
                TitlePage = "Трансфер на РСН 2026",
                IsPublished = true,
                CreatedAt = now,
                UpdatedAt = now
            },
            new Event
            {
                Id = 2,
                TransferId = 2,
                Slug = "innoprom-2026",
                Title = "Трансфер на Иннопром 2026 — Avtobus.ru",
                Description = "Удобный трансфер на выставку Иннопром 2026 в Екатеринбурге.",
                TitlePage = "Трансфер на Иннопром 2026",
                IsPublished = true,
                CreatedAt = now,
                UpdatedAt = now
            },
            new Event
            {
                Id = 3,
                TransferId = 1,
                Slug = "worldfood-2026",
                Title = "Трансфер на WorldFood 2026 — Автобус.ру",
                Description = "Трансфер на международную выставку WorldFood Moscow 2026.",
                TitlePage = "Трансфер на WorldFood 2026",
                BrandColorStart = "#ff6b00",
                BrandColorEnd = "#e55d00",
                IsPublished = true,
                CreatedAt = now,
                UpdatedAt = now
            }
        );
    }
}
