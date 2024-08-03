using System.Net.Http.Json;
using Microsoft.AspNetCore.Components;
using Remote.AC.Web.UI.Services;

namespace Remote.AC.Web.UI.Components;

public partial class RemoteControl : ComponentBase
{
    private bool? acPowerState;
    [Inject] private AppStateService AppStateService { get; set; }
    [Inject] private HttpClient Http { get; set; }
    private async Task BtnFanSpeedDec_Click() => await PostIrCommand("FAN_SPEED_DEC");
    private async Task BtnFanSpeedInc_Click() => await PostIrCommand("FAN_SPEED_INC");
    private async Task BtnModeAutoFan_Click() => await PostIrCommand("MODE_AUTO_FAN");
    private async Task BtnModeCool_Click() => await PostIrCommand("MODE_COOL");
    private async Task BtnModeFanOnly_Click() => await PostIrCommand("MODE_FAN_ONLY");
    private async Task BtnPower_Click() => await PostIrCommand("POWER");
    private async Task BtnTempDown_Click() => await PostIrCommand("TEMP_TIMER_DWN");
    private async Task BtnTempUp_Click() => await PostIrCommand("TEMP_TIMER_UP");
    private async Task BtnToggleAcPowerState_Click()
    {
        var appState = await AppStateService.ToggleAcUnitPower();
        Console.WriteLine($"appState: {appState}");
        acPowerState = appState?.AcUnitOn;
        StateHasChanged();
        Console.WriteLine($"acPowerState: {acPowerState}");
    }
    protected override async Task OnInitializedAsync()
    {
        var appState = await AppStateService.GetAppState();
        Console.WriteLine($"appState: {appState}");
        acPowerState = appState.AcUnitOn;
        StateHasChanged();
    }
    private async Task PostIrCommand(string command)
    {
        var payload = new { Command = command };
        using var response = await Http.PostAsJsonAsync("api/v1/RemoteControl/send_once", payload);
        string result = await response.Content.ReadAsStringAsync();
        Console.WriteLine(result);
    }
}
