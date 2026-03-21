using Site.Core.Models;

namespace Site.Core.ViewModels.Admin;

public class TransferListViewModel
{
    public required List<Transfer> Transfers { get; init; }
}

public class TransferFormViewModel
{
    public required Transfer Transfer { get; set; }
}

public class TransferDeleteViewModel
{
    public required Transfer Transfer { get; set; }
}

public class EventListViewModel
{
    public required List<Event> Events { get; init; }
    public string? SiteBaseUrl { get; init; }
}

public class EventFormViewModel
{
    public IList<Transfer> Transfers { get; set; } = new List<Transfer>();
    public required Event Event { get; set; }
    public string? SiteBaseUrl { get; init; }
}

public class EventDeleteViewModel
{
    public required Event Event { get; init; }
}
