using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Components;
using Remote.AC.Core.Entity;

namespace Remote.AC.Web.UI.Components;

public partial class HistoricalSensorData : ComponentBase
{
    [Inject] private HttpClient Http { get; set; }
    HistoricalData? Data { get; set; }
    int Page { get; set; } = 0;
    class HistoricalData
    {
        public int Count { get; set; }
        public string? Next { get; set; }
        public string? Previous { get; set; }
        public List<DhtSensorData> Results { get; set; } = new();
    }
    private async Task FetchData()
    {
        var pageArg = Page > 0 ? $"?page={Page}" : string.Empty;
        Data = await Http.GetFromJsonAsync<HistoricalData>(
            $"http://localhost:8000/api/dht/historical_data{pageArg}");
        StateHasChanged();
    }
    protected override async Task OnInitializedAsync()
    {
        await FetchData();
    }
    protected void NextPage()
    {
        Page++;
        Console.WriteLine("Page: " + Page);
        _ = FetchData();
    }
}

