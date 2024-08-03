using System.Net.Http.Json;
using Microsoft.AspNetCore.Components;
using Remote.AC.Core.Entities;
using Remote.AC.Web.UI.Model;
using Remote.AC.Web.UI.Services;

namespace Remote.AC.Web.UI.Components;

public partial class HistoricalSensorData : ComponentBase
{
    [Inject] private DhtSensorDataService DhtSensorDataService { get; set; }
    [Inject] private HttpClient Http { get; set; }
    private PagedResponse<IEnumerable<DhtSensorData>>? Response { get; set; }
    private async Task FetchData(Uri? url = null)
    {
        if (url is null)
            Response = await DhtSensorDataService.GetHistoricalDhtSensorData();
        else
            Response = await Http.GetFromJsonAsync<PagedResponse<IEnumerable<DhtSensorData>>>(url);
        StateHasChanged();
    }
    protected override async Task OnInitializedAsync()
    {
        await FetchData();
    }
    private class HistoricalData
    {
        public int Count { get; set; }
        public string? Next { get; set; }
        public string? Previous { get; set; }
        public List<DhtSensorData> Results { get; set; } = new();
    }
}
