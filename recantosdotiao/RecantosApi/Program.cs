using System.Security.Claims;
using System.Text;
using api.Endpoints;
using Microsoft.AspNetCore.Authentication.JwtBearer;

using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using RecantosApi;
using RecantosApi.Endpoints;
using RecantosApi.Infra;
using RecantosApi.Models;

var root = AppDomain.CurrentDomain.BaseDirectory;
var dotenv = Path.Combine(root, ".env");
Console.WriteLine($"Path: {dotenv}");
DotEnv.Carregar(dotenv);

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<RecantoDbContext>();

builder.Services.AddCors();

builder.Services.AddAuthentication(x =>{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>{
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Config.Instancia.ChavePrivada ?? "")),

        ValidateIssuer = false,
        ValidateAudience = false
    };
    x.Events = new JwtBearerEvents{
        OnMessageReceived = ctx =>
        {
            ctx.Request.Cookies.TryGetValue("accessToken", out var accessToken);
            if(!string.IsNullOrEmpty(accessToken))
                ctx.Token = accessToken;
            return Task.CompletedTask;
        }
    };
});

builder.Services.AddAuthorizationBuilder()
    .AddPolicy("Sindico", policy => policy.RequireRole("Sindico"))
    .AddPolicy("Residente", policy => policy.RequireRole("Residente"))
    .AddPolicy("SindicoOuResidente", policy => policy.RequireClaim(ClaimTypes.Role, "Sindico", "Residente"));

builder.Services.AddSingleton<IPasswordHasher<Usuario>,PasswordHasher<Usuario>>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.AdicionarLoginEndpoints();
app.AddResidente();
app.AdicionarBlocoEndpoints();
app.AdicionarCasaEndpoints();
app.AddUsuarioEndpoints();
app.AdicionarAvisoEndpoints();

app.UseCookiePolicy(new CookiePolicyOptions
{
    Secure = CookieSecurePolicy.None, // Permite cookies em HTTP
    MinimumSameSitePolicy = SameSiteMode.Lax // Compatível com cookies de autenticação
});


app.UseCors(builder => builder
    .WithOrigins("http://localhost:3000")
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials()
);

app.UseAuthentication();
app.UseAuthorization();

app.Run();
