using Microsoft.AspNetCore.Mvc;
using Site.Core.Services;

namespace CMS.Controllers;

[Route("admin/uploads")]
public class UploadsController(CmsApiClient api, IConfiguration config) : Controller
{
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Upload(IFormFile? file)
    {
        if (file is null || file.Length == 0)
            return BadRequest(new { error = "Файл не выбран." });

        try
        {
            var path = await api.UploadFileAsync(file.OpenReadStream(), file.FileName);
            var baseUrl = config["CmsApiBaseUrl"]!.TrimEnd('/');
            return Ok(new { url = $"{baseUrl}{path}" });
        }
        catch (HttpRequestException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }
}
