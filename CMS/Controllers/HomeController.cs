using Microsoft.AspNetCore.Mvc;

namespace CMS.Controllers;

public class HomeController : Controller
{
    public IActionResult Index() => Redirect("/admin/events");
}
