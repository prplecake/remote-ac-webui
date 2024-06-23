namespace Remote.AC.Web.UI.Model;

public class Response<T>
{
    public T Data { get; set; }
    public bool Success { get; set; }
    public string? Message { get; set; }
    public string[]? Errors { get; set; }
}
