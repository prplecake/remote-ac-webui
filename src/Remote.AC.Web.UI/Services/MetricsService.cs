using System.Net.Http.Json;
using Remote.AC.Web.UI.Model;

namespace Remote.AC.Web.UI.Services;

public class MetricsService(HttpClient client)
{
    public async Task<Response<double>?> GetHumidityLow()
    {
        return await client.GetFromJsonAsync<Response<double>>("api/v1/metrics/humidity_min");
    }
    public async Task<Response<double>?> GetHumidityHigh()
    {
        return await client.GetFromJsonAsync<Response<double>>("api/v1/metrics/humidity_max");
    }
    public async Task<Response<double>?> GetHumidityAvg()
    {
        return await client.GetFromJsonAsync<Response<double>>("api/v1/metrics/humidity_avg");
    }
    public async Task<Response<double>?> GetTemperatureLow()
    {
        return await client.GetFromJsonAsync<Response<double>>("api/v1/metrics/temperature_min");
    }
    public async Task<Response<double>?> GetTemperatureHigh()
    {
        return await client.GetFromJsonAsync<Response<double>>("api/v1/metrics/temperature_max");
    }
    public async Task<Response<double>?> GetTemperatureAvg()
    {
        return await client.GetFromJsonAsync<Response<double>>("api/v1/metrics/temperature_avg");
    }
}
