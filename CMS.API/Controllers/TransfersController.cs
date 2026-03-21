using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.API.Data;
using Site.Core.Models;

namespace CMS.API.Controllers;

[ApiController]
[Route("api/transfers")]
public class TransfersController : ControllerBase
{
    private readonly AppDbContext _db;

    public TransfersController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Transfer>>> GetAll()
    {
        var transfers = await _db.Transfers.AsNoTracking()
            .OrderBy(t => t.Name)
            .ToListAsync();
        return Ok(transfers);
    }

    [HttpGet("{domain}")]
    public async Task<ActionResult<Transfer>> GetByDomain(string domain)
    {
        var transfer = await _db.Transfers.AsNoTracking()
            .FirstOrDefaultAsync(t => t.Domain == domain);

        return transfer is null ? NotFound() : Ok(transfer);
    }

    [HttpPost]
    public async Task<ActionResult<Transfer>> Create([FromBody] Transfer input)
    {
        input.CreatedAt = DateTime.UtcNow;
        input.UpdatedAt = DateTime.UtcNow;
        _db.Transfers.Add(input);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetByDomain), new { domain = input.Domain }, input);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] Transfer input)
    {
        var existing = await _db.Transfers.FindAsync(id);
        if (existing is null) return NotFound();

        existing.Name = input.Name;
        existing.Slug = input.Slug;
        existing.Domain = input.Domain;
        existing.LogoUrl = input.LogoUrl;
        existing.BrandColorStart = input.BrandColorStart;
        existing.BrandColorEnd = input.BrandColorEnd;
        existing.PrimaryColorStart = input.PrimaryColorStart;
        existing.PrimaryColorEnd = input.PrimaryColorEnd;
        existing.Phone = input.Phone;
        existing.Email = input.Email;
        existing.LegalAddress = input.LegalAddress;
        existing.TransportType = input.TransportType;
        existing.INN = input.INN;
        existing.OGRN = input.OGRN;
        existing.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var transfer = await _db.Transfers.FindAsync(id);
        if (transfer is null) return NotFound();

        _db.Transfers.Remove(transfer);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
