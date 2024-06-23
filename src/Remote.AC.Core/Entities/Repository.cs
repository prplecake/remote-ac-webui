namespace Remote.AC.Core.Entities;

public class Repository
{
    public string? Url { get; set; }
    public Commit Commit { get; set; } = new();
}
public class Commit
{
    public string? Hash { get; set; }
    public string? Branch { get; set; }
}
