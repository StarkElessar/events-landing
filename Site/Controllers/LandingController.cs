using Microsoft.AspNetCore.Mvc;
using Site.Core.Services;
using Site.Core.ViewModels.Landing;

namespace Site.Controllers;

public class LandingController(CmsApiClient api, ITransferProvider tp) : Controller
{
	[Route("/{slug}")]
    public async Task<IActionResult> Index(string slug)
    {
        if (string.IsNullOrWhiteSpace(slug))
            return NotFound();

        var transferId = await tp.GetTransferIdAsync();
        var ev = await api.GetEventBySlugAsync(slug, transferId);

        if (ev is null)
            return NotFound();

        var vm = new LandingViewModel
        {
            Event = ev,
            Title = ev.Title,
            MetaDescription = ev.Description,
            BrandColorStart = ev.EffectiveBrandColorStart,
            BrandColorEnd = ev.EffectiveBrandColorEnd,
            PrimaryColorStart = ev.EffectivePrimaryColorStart,
            PrimaryColorEnd = ev.EffectivePrimaryColorEnd,
        };

        return View("~/Views/Landing/Index.cshtml", vm);
    }
}
