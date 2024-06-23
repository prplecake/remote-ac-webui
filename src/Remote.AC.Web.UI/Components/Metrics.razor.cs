using Microsoft.AspNetCore.Components;
using Remote.AC.Core.Helpers;
using Remote.AC.Web.UI.Services;

namespace Remote.AC.Web.UI.Components;

public partial class Metrics : ComponentBase
{
    private double _humidityAvg;
    private double _humidityHigh;
    private double _humidityLow;
    private double _tempAvg;
    private double _tempHigh;
    private double _tempLow;
    private double HumidityAvg
    {
        get => Math.Round(_humidityAvg, 2);
        set => _humidityAvg = value;
    }
    private double HumidityHigh
    {
        get => Math.Round(_humidityHigh, 2);
        set => _humidityHigh = value;
    }
    private double HumidityLow
    {
        get => Math.Round(_humidityLow, 2);
        set => _humidityLow = value;
    }
    [Inject] private MetricsService MetricsService { get; set; }
    private double TempAvg
    {
        get => Math.Round(TemperatureHelpers.CelsiusToFahrenheit(_tempAvg), 2);
        set => _tempAvg = value;
    }
    private double TempHigh
    {
        get => Math.Round(TemperatureHelpers.CelsiusToFahrenheit(_tempHigh), 2);
        set => _tempHigh = value;
    }
    private double TempLow
    {
        get => Math.Round(TemperatureHelpers.CelsiusToFahrenheit(_tempLow), 2);
        set => _tempLow = value;
    }
    protected override async Task OnInitializedAsync()
    {
        TempLow = (await MetricsService.GetTemperatureLow()).Data;
        TempHigh = (await MetricsService.GetTemperatureHigh()).Data;
        TempAvg = (await MetricsService.GetTemperatureAvg()).Data;
        HumidityLow = (await MetricsService.GetHumidityLow()).Data;
        HumidityHigh = (await MetricsService.GetHumidityHigh()).Data;
        HumidityAvg = (await MetricsService.GetHumidityAvg()).Data;
    }
}
