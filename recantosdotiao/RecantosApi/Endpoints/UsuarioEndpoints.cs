using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RecantosApi.DTOs;
using RecantosApi.Infra;
using RecantosApi.Models;

namespace RecantosApi.Endpoints;

public static class UsuarioEndpoints
{
    public static void AddUsuarioEndpoints(this WebApplication app)
    {
        app.MapGet("/usuarios", GetAllAsync).RequireAuthorization();
        app.MapGet("/usuarios/{id}", GetByIdAsync).RequireAuthorization();
        app.MapPost("/usuarios", PostAsync).RequireAuthorization();
        app.MapPost("/usuarios/admin", PostAsyncAdmin).RequireAuthorization();
        app.MapPut("/usuarios/{id}", PutAsync).RequireAuthorization();
        // app.MapPatch("/usuarios/{id}/{senhaAnterior}/{senhaNova}", PatchAlteraSenhaAsync);
        app.MapDelete("/usuarios/{id}", DeleteAsync).RequireAuthorization();
    }

   
    private static async Task<IResult> GetAllAsync(RecantoDbContext db)
    {
        var usuarios = await db.Usuarios.ToListAsync();
        return TypedResults.Ok(usuarios.Select(x => new UserDTO(x)));
    }

    
    private static async Task<IResult> GetByIdAsync(long id, RecantoDbContext db)
    {
        var usuario = await db.Usuarios.FindAsync(Convert.ToInt64(id));
        return usuario != null ? TypedResults.Ok(new UserDTO(usuario)) : TypedResults.NotFound();
    }

    
    private static async Task<IResult> PostAsync(UserDTO userDTO, RecantoDbContext db,IPasswordHasher<Usuario> hasher)
    {
        var existeLogin = await db.Usuarios.AnyAsync(u => u.Login == userDTO.Login);
        if (existeLogin)
        {
            return TypedResults.Conflict("Já existe um usuário com este Login.");
        }
        

        Usuario usuario = userDTO.GetModel();
        usuario.Id = GeradorId.GetId(); 
        usuario.Role = "Residente";
        usuario.Senha = hasher.HashPassword(usuario,usuario.Senha);
        await db.Usuarios.AddAsync(usuario);
        await db.SaveChangesAsync();

        return TypedResults.Created($"/usuarios/{usuario.Id}",new UserDTO(usuario));
    }
    private static async Task<IResult> PostAsyncAdmin(UserDTO userDTO, RecantoDbContext db,IPasswordHasher<Usuario> hasher)
    {
        var existeLogin = await db.Usuarios.AnyAsync(u => u.Login == userDTO.Login);
        if (existeLogin)
        {
            return TypedResults.Conflict("Já existe um usuário com este Login.");
        }

        Usuario usuario = userDTO.GetModel();
        usuario.Id = GeradorId.GetId(); 
        usuario.Role = "Sindico";
        usuario.Senha = hasher.HashPassword(usuario,usuario.Senha);
        await db.Usuarios.AddAsync(usuario);
        await db.SaveChangesAsync();

        return TypedResults.Created($"/usuarios/{usuario.Id}",new UserDTO(usuario));
    }

   
    private static async Task<IResult> PutAsync(long Id, UserDTO usuarioAtualizadoDTO, RecantoDbContext db, IPasswordHasher<Usuario> hasher)
    {
        if (Id != Convert.ToInt64(usuarioAtualizadoDTO.Id))
        {
            return TypedResults.BadRequest("O ID na URL e no corpo não correspondem.");
        }

        var usuario = await db.Usuarios.FindAsync(Id);
        if (usuario == null)
        {
            return TypedResults.NotFound();
        }

        usuario.Login = usuarioAtualizadoDTO.Login;
        
        if (!string.IsNullOrEmpty(usuarioAtualizadoDTO.Senha))
        {
            usuario.Senha = hasher.HashPassword(usuario, usuarioAtualizadoDTO.Senha);
        }

        try
        {
            await db.SaveChangesAsync();
            return TypedResults.NoContent();
        }
        catch (DbUpdateException ex)
        {
            return TypedResults.Problem($"Erro ao atualizar o usuário: {ex.Message}");
        }
    }

    // private static async Task<IResult> PatchAlteraSenhaAsync(long Id, string senhaAnterior, string senhaNova, RecantoDbContext db,IPasswordHasher<Usuario> hasher)
    // {
    //     var usuario = await db.Usuarios.FindAsync(Convert.ToInt64(Id));
    //     if (usuario == null)
    //     {
    //         return TypedResults.NotFound();
    //     }

    //     if(string.IsNullOrEmpty(usuario.Senha) || hasher.VerifyHashedPassword(usuario,usuario.Senha,senhaAnterior) != PasswordVerificationResult.Failed){
    //         usuario.Senha = hasher.HashPassword(usuario,senhaNova);
    //     }else{
    //         return TypedResults.Unauthorized();
    //     }
        

    //     db.Usuarios.Update(usuario);
    //     await db.SaveChangesAsync();

    //     return TypedResults.NoContent();
    // }

    private static async Task<IResult> DeleteAsync(string id, RecantoDbContext db)
    {
        var usuario = await db.Usuarios.FindAsync(Convert.ToInt64(id));
        if (usuario == null)
        {
            return TypedResults.NotFound();
        }

        db.Usuarios.Remove(usuario);
        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }

    
}
