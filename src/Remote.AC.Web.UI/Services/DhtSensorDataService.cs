using System.Net.Http.Json;
using Remote.AC.Core.Entities;
using Remote.AC.Web.UI.Components;
using Remote.AC.Web.UI.Model;

namespace Remote.AC.Web.UI.Services;

public class DhtSensorDataService(HttpClient client)
{
    public async Task<IEnumerable<DhtSensorData>?> GetDhtSensorData()
    {
        return await client.GetFromJsonAsync<IEnumerable<DhtSensorData>>("api/v1/dht/get_data");
    }
    public async Task<DhtSensorData?> GetLatestDhtSensorData()
    {
        return await client.GetFromJsonAsync<DhtSensorData>("api/v1/dht/last_record");
    }
    public async Task<PagedResponse<IEnumerable<DhtSensorData>>?> GetHistoricalDhtSensorData(string pageArg)
    {
        return await client.GetFromJsonAsync<PagedResponse<IEnumerable<DhtSensorData>>>("api/v1/dht/historical_data");
    }
}
