using Microsoft.AspNetCore.Mvc;
using Site.Core.ViewModels;

namespace Site.Controllers;

public class ErrorController : Controller
{
    [Route("/errors/{code:int}")]
    public IActionResult Handle(int code)
    {
        if (code == 404)
            return View("~/Views/Errors/NotFound.cshtml", new ErrorViewModel { Title = "404 — Страница не найдена" });

        return StatusCode(code);
    }
}
