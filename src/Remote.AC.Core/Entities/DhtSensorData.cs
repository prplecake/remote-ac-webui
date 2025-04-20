using System.Text.Json.Serialization;

namespace Remote.AC.Core.Entities;

public class DhtSensorData
{
    [JsonPropertyName("timestamp")] public DateTime Date { get; set; }
    [JsonPropertyName("temperature")] public double TempC { get; set; }
    public double Humidity { get; set; }
}
