using CMS.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Site.Core.Models;
using Site.Core.Services;
using Site.Core.ViewModels.Admin;

namespace CMS.Controllers;

[Route("admin/events")]
public class EventsController(CmsApiClient api, IConfiguration config) : Controller
{
    private string? SiteBaseUrl => config["SiteBaseUrl"];

    [HttpGet("")]
    [AdminNavLink("События", order: 2)]
    public async Task<IActionResult> Index()
    {
        var events = (await api.GetAllEventsAsync())?.ToList() ?? new List<Event>();
        return View(new EventListViewModel { Events = events, SiteBaseUrl = SiteBaseUrl });
    }

    [HttpGet("create")]
    public async Task<IActionResult> Create()
    {
        var transfers = (await api.GetAllTransfersAsync())?.ToList() ?? new List<Transfer>();
        return View(new EventFormViewModel
        {
            Transfers = transfers,
            Event = new Event(),
            SiteBaseUrl = SiteBaseUrl,
        });
    }

    [HttpPost("create")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(EventFormViewModel vm)
    {
        NullifyEmptyColors(vm.Event);
        ModelState.Remove("Event.Transfer");

        if (!ModelState.IsValid)
        {
            vm.Transfers = (await api.GetAllTransfersAsync())?.ToList() ?? new List<Transfer>();
            return View(vm);
        }

        vm.Event.CreatedAt = DateTime.UtcNow;
        vm.Event.UpdatedAt = DateTime.UtcNow;
        await api.CreateEventAsync(vm.Event);
        return RedirectToAction(nameof(Index));
    }

    [HttpGet("edit/{id:int}")]
    public async Task<IActionResult> Edit(int id)
    {
        var ev = await api.GetEventByIdAsync(id);
        if (ev is null) return NotFound();

        var transfers = (await api.GetAllTransfersAsync())?.ToList() ?? new List<Transfer>();
        return View(new EventFormViewModel
        {
            Transfers = transfers,
            Event = ev,
            SiteBaseUrl = SiteBaseUrl,
        });
    }

    [HttpPost("edit/{id:int}")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, EventFormViewModel vm)
    {
        NullifyEmptyColors(vm.Event);
        ModelState.Remove("Event.Transfer");

        if (!ModelState.IsValid)
        {
            vm.Transfers = (await api.GetAllTransfersAsync())?.ToList() ?? new List<Transfer>();
            return View(vm);
        }

        vm.Event.UpdatedAt = DateTime.UtcNow;
        var result = await api.UpdateEventAsync(id, vm.Event);

        if (result?.DisplacedEventTitle is not null)
            TempData["DisplacedEventTitle"] = result.DisplacedEventTitle;

        return RedirectToAction(nameof(Index));
    }

    [HttpGet("delete/{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var ev = await api.GetEventByIdAsync(id);
        if (ev is null) return NotFound();

        return View(new EventDeleteViewModel { Event = ev });
    }

    [HttpPost("delete/{id:int}")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
        await api.DeleteEventAsync(id);
        return RedirectToAction(nameof(Index));
    }

    private static void NullifyEmptyColors(Event ev)
    {
        if (string.IsNullOrWhiteSpace(ev.BrandColorStart)) ev.BrandColorStart = null;
        if (string.IsNullOrWhiteSpace(ev.BrandColorEnd)) ev.BrandColorEnd = null;
        if (string.IsNullOrWhiteSpace(ev.PrimaryColorStart)) ev.PrimaryColorStart = null;
        if (string.IsNullOrWhiteSpace(ev.PrimaryColorEnd)) ev.PrimaryColorEnd = null;
        if (string.IsNullOrWhiteSpace(ev.LogoUrl)) ev.LogoUrl = null;
    }
}
