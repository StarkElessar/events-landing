using CMS.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Site.Core.Models;
using Site.Core.Services;
using Site.Core.ViewModels.Admin;

namespace CMS.Controllers;

[Route("admin/transfers")]
public class TransferController(CmsApiClient api) : Controller
{
    [HttpGet("")]
    [AdminNavLink("Трансферы", order: 1)]
    public async Task<IActionResult> Index()
    {
        var transfers = (await api.GetAllTransfersAsync())?.ToList() ?? new List<Transfer>();
        return View(new TransferListViewModel { Transfers = transfers });
    }

    [HttpGet("create")]
    public IActionResult Create() =>
        View(new TransferFormViewModel { Transfer = new Transfer() });

    [HttpPost("create")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(TransferFormViewModel vm)
    {
        if (!ModelState.IsValid)
            return View(vm);

        vm.Transfer.CreatedAt = DateTime.UtcNow;
        vm.Transfer.UpdatedAt = DateTime.UtcNow;
        await api.CreateTransferAsync(vm.Transfer);
        return RedirectToAction(nameof(Index));
    }

    [HttpGet("edit/{id:int}")]
    public async Task<IActionResult> Edit(int id)
    {
        var transfers = (await api.GetAllTransfersAsync())?.ToList();
        var transfer = transfers?.FirstOrDefault(t => t.Id == id);
        if (transfer is null) return NotFound();

        return View(new TransferFormViewModel { Transfer = transfer });
    }

    [HttpPost("edit/{id:int}")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, TransferFormViewModel vm)
    {
        if (!ModelState.IsValid)
            return View(vm);

        vm.Transfer.Id = id;
        vm.Transfer.UpdatedAt = DateTime.UtcNow;
        await api.UpdateTransferAsync(id, vm.Transfer);
        return RedirectToAction(nameof(Index));
    }

    [HttpGet("delete/{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var transfers = (await api.GetAllTransfersAsync())?.ToList();
        var transfer = transfers?.FirstOrDefault(t => t.Id == id);
        if (transfer is null) return NotFound();

        return View(new TransferDeleteViewModel { Transfer = transfer });
    }

    [HttpPost("delete/{id:int}")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
        await api.DeleteTransferAsync(id);
        return RedirectToAction(nameof(Index));
    }
}
