using Site.Core.Models;

namespace Site.Core.Services;

/// <summary>
/// Abstracts the resolution of the current Transfer for this deployment instance.
/// CMS.API provides the concrete implementation backed by the database.
/// Site and CMS consume this via HTTP through IEventApiClient / ITransferApiClient.
/// </summary>
public interface ITransferProvider
{
    Task<Transfer> GetTransferAsync();
    Task<int> GetTransferIdAsync();
}
