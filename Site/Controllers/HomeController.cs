using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Site.Core.Services;
using Site.Core.ViewModels;

namespace Site.Controllers;

public class HomeController(CmsApiClient api, ITransferProvider tp) : Controller
{
    public async Task<IActionResult> Index()
    {
        var transferId = await tp.GetTransferIdAsync();
        var defaultEvent = await api.GetDefaultEventAsync(transferId);

        if (defaultEvent is null)
            return NotFound();

        return RedirectToAction(nameof(LandingController.Index), "Landing", new { slug = defaultEvent.Slug });
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
