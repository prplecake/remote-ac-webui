namespace Remote.AC.Core.Helpers;

public static class TemperatureHelpers
{
    public static double CelsiusToFahrenheit(double celsius)
    {
        return celsius * 9 / 5 + 32;
    }
}
