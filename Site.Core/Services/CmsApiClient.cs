using System.Net.Http.Json;
using Site.Core.Models;

namespace Site.Core.Services;

public class CmsApiClient
{
    private readonly HttpClient _http;

    public CmsApiClient(HttpClient http) => _http = http;

    private static class Routes
    {
        public const string Transfers = "api/transfers";
        public const string Transfer = "api/transfers/{0}";
        public const string Events = "api/events";
        public const string Event = "api/events/{0}";
        public const string EventsByTransfer = "api/events?transferId={0}";
        public const string EventById = "api/events/{0}?transferId={1}";
        public const string EventDefault = "api/events/default?transferId={0}";
    }

    // --- Transfers ---

    public Task<IEnumerable<Transfer>?> GetAllTransfersAsync()
        => _http.GetFromJsonAsync<IEnumerable<Transfer>>(Routes.Transfers);

    public Task<Transfer?> GetTransferByDomainAsync(string domain)
        => _http.GetFromJsonAsync<Transfer>(string.Format(Routes.Transfer, Uri.EscapeDataString(domain)));

    public async Task<Transfer> CreateTransferAsync(Transfer transfer)
    {
        var response = await _http.PostAsJsonAsync(Routes.Transfers, transfer);
        response.EnsureSuccessStatusCode();
        return (await response.Content.ReadFromJsonAsync<Transfer>())!;
    }

    public async Task DeleteTransferAsync(int id)
    {
        var response = await _http.DeleteAsync(string.Format(Routes.Transfer, id));
        response.EnsureSuccessStatusCode();
    }

    // --- Events ---

    public Task<IEnumerable<Event>?> GetAllEventsAsync()
        => _http.GetFromJsonAsync<IEnumerable<Event>>(Routes.Events);

    public Task<IEnumerable<Event>?> GetEventsByTransferAsync(int transferId)
        => _http.GetFromJsonAsync<IEnumerable<Event>>(string.Format(Routes.EventsByTransfer, transferId));

    public Task<Event?> GetEventByIdAsync(int id)
        => _http.GetFromJsonAsync<Event>(string.Format(Routes.Event, id));

    public Task<Event?> GetEventByIdAsync(int id, int transferId)
        => _http.GetFromJsonAsync<Event>(string.Format(Routes.EventById, id, transferId));

    public async Task<Event?> GetEventBySlugAsync(string slug, int transferId)
    {
        var response = await _http.GetAsync(string.Format(Routes.EventById, Uri.EscapeDataString(slug), transferId));
        if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
            return null;
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<Event>();
    }

    public async Task UpdateTransferAsync(int id, Transfer transfer)
    {
        var response = await _http.PutAsJsonAsync(string.Format(Routes.Transfer, id), transfer);
        response.EnsureSuccessStatusCode();
    }

    public async Task<Event> CreateEventAsync(Event ev)
    {
        var response = await _http.PostAsJsonAsync(Routes.Events, ev);
        response.EnsureSuccessStatusCode();
        return (await response.Content.ReadFromJsonAsync<Event>())!;
    }

    public async Task<UpdateEventResult?> UpdateEventAsync(int id, Event ev)
    {
        var response = await _http.PutAsJsonAsync(string.Format(Routes.Event, id), ev);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<UpdateEventResult>();
    }

    public async Task<Event?> GetDefaultEventAsync(int transferId)
    {
        var response = await _http.GetAsync(string.Format(Routes.EventDefault, transferId));
        if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
            return null;
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<Event>();
    }

    public async Task DeleteEventAsync(int id, int transferId)
    {
        var response = await _http.DeleteAsync(string.Format(Routes.EventById, id, transferId));
        response.EnsureSuccessStatusCode();
    }

    public async Task DeleteEventAsync(int id)
    {
        var response = await _http.DeleteAsync(string.Format(Routes.Event, id));
        response.EnsureSuccessStatusCode();
    }
}
