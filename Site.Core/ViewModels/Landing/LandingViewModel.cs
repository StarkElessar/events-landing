using Site.Core.Models;

namespace Site.Core.ViewModels.Landing;

public class LandingViewModel : BaseViewModel
{
    public required Event Event { get; init; }
}
