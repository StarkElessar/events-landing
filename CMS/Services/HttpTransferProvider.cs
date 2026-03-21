using Site.Core.Models;
using Site.Core.Services;

namespace CMS.Services;

/// <summary>
/// Resolves the current Transfer by calling CMS.API over HTTP.
/// Registered as scoped — caches the Transfer per HTTP request.
/// </summary>
public class HttpTransferProvider : ITransferProvider
{
    private readonly CmsApiClient _api;
    private readonly string _transferDomain;
    private Transfer? _cached;

    public HttpTransferProvider(CmsApiClient api, IConfiguration configuration)
    {
        _api = api;
        _transferDomain = configuration["TransferDomain"]
            ?? throw new InvalidOperationException("TransferDomain is not configured.");
    }

    public async Task<Transfer> GetTransferAsync()
    {
        _cached ??= await _api.GetTransferByDomainAsync(_transferDomain);
        return _cached
            ?? throw new InvalidOperationException($"Transfer with domain '{_transferDomain}' not found.");
    }

    public async Task<int> GetTransferIdAsync()
    {
        var transfer = await GetTransferAsync();
        return transfer.Id;
    }
}
