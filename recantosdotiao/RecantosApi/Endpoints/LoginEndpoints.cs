using System;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RecantosApi.DTOs;
using RecantosApi.Infra;
using RecantosApi.Models;
using RecantosApi.Services;

namespace RecantosApi.Endpoints;

public static class LoginEndpoints
{
    public static void AdicionarLoginEndpoints(this WebApplication app){
        app.MapPost("/login/app", PostLoginAppAsync);
        app.MapPost("/login/navegador", PostLoginNavegadorAsync);
    }

private static async Task<IResult> PostLoginNavegadorAsync(
    LoginDTO infoLogin, 
    RecantoDbContext db, 
    IPasswordHasher<Usuario> hasher, 
    HttpContext contexto
)
{

    var usuario = await db.Usuarios.FirstOrDefaultAsync(x => x.Login.Equals(infoLogin.login));

    if (usuario == null)
        return TypedResults.Unauthorized();

    var resultadoVerificacao = hasher.VerifyHashedPassword(usuario, usuario.Senha, infoLogin.senha);

    if (resultadoVerificacao == PasswordVerificationResult.Failed)
        return TypedResults.Unauthorized();

    var token = new TokenService().Gerar(usuario);

    contexto.Response.Cookies.Append(
        "accessToken",
        token,
        new CookieOptions
        {
            HttpOnly = true,
            SameSite = SameSiteMode.None,
        }
    );

    Console.WriteLine("Usuario dto: " + new UserDTO(usuario).Role);
    return TypedResults.Ok(new UserDTO(usuario));
}

    private static async Task<IResult> PostLoginAppAsync(LoginDTO infoLogin, RecantoDbContext db, IPasswordHasher<Usuario> hasher){
        var usuario = await db.Usuarios.FirstOrDefaultAsync(x => x.Login.Equals(infoLogin.login));

        if(usuario == null)
            return TypedResults.Unauthorized();
        else if(hasher.VerifyHashedPassword(usuario, usuario.Senha, infoLogin.senha) == PasswordVerificationResult.Failed){
            return TypedResults.Unauthorized();
        }

        var token = new TokenService().Gerar(usuario);

        var usuarioDto = new UserDTO(usuario);

        return TypedResults.Ok(new
        {
            Token = token,
            Usuario = usuarioDto
        });
    }

}
