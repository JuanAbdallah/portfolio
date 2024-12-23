using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using RecantosApi.Models;

namespace RecantosApi.Services;

public class TokenService
{
    public string Gerar(Usuario usuario){
        var handler = new JwtSecurityTokenHandler();
        var token = handler.CreateToken(GetTokenDescriptor(usuario));

        return handler.WriteToken(token);
    }

    private static SecurityTokenDescriptor GetTokenDescriptor(Usuario usuario){
    var agora = DateTime.UtcNow;

    Console.WriteLine(agora);
    var std = new SecurityTokenDescriptor{
        Subject = GerarClaims(usuario),
        Expires = agora.AddHours(1), 
        NotBefore = agora,           
        IssuedAt = agora,            
        SigningCredentials = GetCredentials(),
    };
    Console.WriteLine(std.Expires);
    Console.WriteLine(std.NotBefore);
    Console.WriteLine(std.IssuedAt);
    return std;
}


    private static ClaimsIdentity GerarClaims(Usuario usuario)
    {
        var ci = new ClaimsIdentity();

        ci.AddClaim(new Claim(ClaimTypes.Name, usuario.Login));
        ci.AddClaim(new Claim(ClaimTypes.Role, usuario.Role));

        return ci;
    }

    private static SigningCredentials GetCredentials()
    {
        Console.WriteLine($"Chave Privada: {Config.Instancia.ChavePrivada}");

        var key = Encoding.ASCII.GetBytes(Config.Instancia.ChavePrivada ?? "");

        return new SigningCredentials(
            new SymmetricSecurityKey(key),
            SecurityAlgorithms.HmacSha256Signature
        );
    }

    
}
