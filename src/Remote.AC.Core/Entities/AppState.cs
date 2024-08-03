namespace Remote.AC.Core.Entities;

public record AppState(
    bool? AcUnitOn,
    string? WeatherStation,
    string? WxGridPoints
);
