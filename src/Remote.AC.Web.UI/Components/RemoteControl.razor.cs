using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;
using Remote.AC.Web.UI.Services;

namespace Remote.AC.Web.UI.Components;

public partial class RemoteControl : ComponentBase
{
    [Inject] private AppStateService AppStateService { get; set; }
    private bool? acPowerState;
    protected override async Task OnInitializedAsync()
    {
        acPowerState = (await AppStateService.GetAppState()).AcUnitOn;
    }
    private Task Test(MouseEventArgs arg)
    {
        Console.WriteLine("Test Clicked");
        return Task.CompletedTask;
    }
}

