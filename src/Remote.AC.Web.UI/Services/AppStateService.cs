using System.Net.Http.Json;
using Remote.AC.Core.Entities;
using Remote.AC.Web.UI.Model;

namespace Remote.AC.Web.UI.Services;

public class AppStateService(HttpClient client)
{
    public async Task<AppState?> GetAppState()
    {
        return (await client.GetFromJsonAsync<Response<AppState>>("api/v1/appstate")).Data;
    }
    public async Task<AppState?> ToggleAcUnitPower()
    {
        var response = await client.PostAsync("api/v1/appstate/ac_power/toggle", null);
        return (await response.Content.ReadFromJsonAsync<Response<AppState>>()).Data;
    }
    public async Task UpdateAppState(AppState appState)
    {
        await client.PatchAsJsonAsync("api/v1/appstate", appState);
    }
}
