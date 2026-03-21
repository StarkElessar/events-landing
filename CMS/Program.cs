using Site.Core.Services;
using Vite.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

var mvcBuilder = builder.Services.AddControllersWithViews();
if (builder.Environment.IsDevelopment())
    mvcBuilder.AddRazorRuntimeCompilation();

var cmsApiBaseUrl = builder.Configuration["CmsApiBaseUrl"]
    ?? throw new InvalidOperationException("CmsApiBaseUrl is not configured.");

builder.Services.AddHttpClient<CmsApiClient>(client =>
    client.BaseAddress = new Uri(cmsApiBaseUrl));

builder.Services.AddViteServices(options =>
{
    options.Server.AutoRun = builder.Environment.IsDevelopment();
    options.Server.Port = 5174;
    options.Server.PackageDirectory = Path.Combine(builder.Environment.ContentRootPath, "ClientApp");
    options.Server.PackageManager = "pnpm";
    options.Base = "dist";
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/error");
}

app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

if (app.Environment.IsDevelopment())
{
    app.UseViteDevelopmentServer();
}

app.MapControllerRoute(name: "admin", pattern: "admin/{controller=Events}/{action=Index}/{id?}");
app.MapControllerRoute(name: "default", pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
