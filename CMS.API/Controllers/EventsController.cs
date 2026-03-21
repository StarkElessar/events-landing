using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.API.Data;
using Site.Core.Models;

namespace CMS.API.Controllers;

[ApiController]
[Route("api/events")]
public class EventsController : ControllerBase
{
    private readonly AppDbContext _db;

    public EventsController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Event>>> GetAll([FromQuery] int? transferId = null)
    {
        var query = _db.Events
            .Include(e => e.Transfer)
            .AsNoTracking();

        if (transferId.HasValue)
            query = query.Where(e => e.TransferId == transferId.Value);

        var events = await query
            .OrderByDescending(e => e.CreatedAt)
            .ToListAsync();

        return Ok(events);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Event>> GetById(int id, [FromQuery] int? transferId = null)
    {
        var query = _db.Events
            .Include(e => e.Transfer)
            .AsNoTracking()
            .Where(e => e.Id == id);

        if (transferId.HasValue)
            query = query.Where(e => e.TransferId == transferId.Value);

        var ev = await query.FirstOrDefaultAsync();
        return ev is null ? NotFound() : Ok(ev);
    }

    [HttpGet("default")]
    public async Task<ActionResult<Event>> GetDefault([FromQuery] int transferId)
    {
        var ev = await _db.Events
            .Include(e => e.Transfer)
            .AsNoTracking()
            .FirstOrDefaultAsync(e => e.TransferId == transferId && e.IsDefault && e.IsPublished);

        return ev is null ? NotFound() : Ok(ev);
    }

    [HttpGet("{slug}")]
    public async Task<ActionResult<Event>> GetBySlug(string slug, [FromQuery] int transferId)
    {
        var ev = await _db.Events
            .Include(e => e.Transfer)
            .AsNoTracking()
            .FirstOrDefaultAsync(e => e.Slug == slug && e.IsPublished && e.TransferId == transferId);

        return ev is null ? NotFound() : Ok(ev);
    }

    [HttpPost]
    public async Task<ActionResult<Event>> Create([FromBody] Event input)
    {
        input.CreatedAt = DateTime.UtcNow;
        input.UpdatedAt = DateTime.UtcNow;
        _db.Events.Add(input);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetBySlug), new { slug = input.Slug, transferId = input.TransferId }, input);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] Event input)
    {
        var existing = await _db.Events.FirstOrDefaultAsync(e => e.Id == id && e.TransferId == input.TransferId);
        if (existing is null) return NotFound();

        existing.Slug = input.Slug;
        existing.Title = input.Title;
        existing.Description = input.Description;
        existing.TitlePage = input.TitlePage;
        existing.TopLogoUrl = input.TopLogoUrl;
        existing.BottomLogoUrl = input.BottomLogoUrl;
        existing.BrandColorStart = input.BrandColorStart;
        existing.BrandColorEnd = input.BrandColorEnd;
        existing.PrimaryColorStart = input.PrimaryColorStart;
        existing.PrimaryColorEnd = input.PrimaryColorEnd;
        existing.IsPublished = input.IsPublished;
        existing.IsDefault = input.IsDefault;
        existing.UpdatedAt = DateTime.UtcNow;

        string? displacedTitle = null;
        if (input.IsDefault)
        {
            var previous = await _db.Events
                .Where(e => e.TransferId == input.TransferId && e.IsDefault && e.Id != id)
                .FirstOrDefaultAsync();

            if (previous is not null)
            {
                displacedTitle = previous.TitlePage;
                previous.IsDefault = false;
            }
        }

        await _db.SaveChangesAsync();
        return Ok(new { displacedEventTitle = displacedTitle });
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, [FromQuery] int? transferId = null)
    {
        var query = _db.Events.Where(e => e.Id == id);
        if (transferId.HasValue)
            query = query.Where(e => e.TransferId == transferId.Value);

        var ev = await query.FirstOrDefaultAsync();
        if (ev is null) return NotFound();

        _db.Events.Remove(ev);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
