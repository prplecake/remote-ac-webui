using System.Diagnostics;

namespace Remote.AC.Core.Entity;

public class Command
{
    public Command(string name, string arguments)
    {
        Name = name;
        Arguments = arguments;
    }
    private string? Name { get; set; }
    private string? Arguments { get; set; }
    public string? Result { get; set; }
    public async Task<Command> RunAsync()
    {
        var process = new Process
        {
            StartInfo = new()
            {
                FileName = Name,
                Arguments = Arguments,
                RedirectStandardOutput = true,
                UseShellExecute = true
            }
        };
        process.Start();
        Result = process.StandardOutput.ReadToEnd();
        return this;
    }
    public void Run()
    {
        Task.Run(RunAsync);
    }
}
