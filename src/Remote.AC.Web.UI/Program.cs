using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Remote.AC.Web.UI;
using Remote.AC.Web.UI.Services;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient
    { BaseAddress = new Uri(builder.Configuration["HomeserverUri"] ?? throw new Exception("HomeserverUri is not set")) });

builder.Services.AddScoped<AppStateService>();
builder.Services.AddScoped<DhtSensorDataService>();
builder.Services.AddScoped<MetricsService>();

await builder.Build().RunAsync();
