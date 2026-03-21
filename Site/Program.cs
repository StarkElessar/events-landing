using Site.Core.Services;
using Site.Services;
using Vite.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

var cmsApiBaseUrl = builder.Configuration["CmsApiBaseUrl"]
    ?? throw new InvalidOperationException("CmsApiBaseUrl is not configured.");

builder.Services.AddHttpClient<CmsApiClient>(client =>
    client.BaseAddress = new Uri(cmsApiBaseUrl));

builder.Services.AddScoped<ITransferProvider, HttpTransferProvider>();

builder.Services.AddViteServices(options =>
{
    options.Server.AutoRun = builder.Environment.IsDevelopment();
    options.Server.Port = 5175;
    options.Server.PackageDirectory = Path.Combine(builder.Environment.ContentRootPath, "ClientApp");
    options.Server.PackageManager = "pnpm";
    options.Base = "dist";
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/error");
}

app.UseStatusCodePagesWithReExecute("/errors/{0}");

app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

if (app.Environment.IsDevelopment())
{
    app.UseViteDevelopmentServer();
}

app.MapControllerRoute(
    name: "landing",
    pattern: "{slug}",
    defaults: new { controller = "Landing", action = "Index" });
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
