using Microsoft.EntityFrameworkCore;
using RecantosApi.DTOs;
using RecantosApi.Infra;
using RecantosApi.Models;

namespace RecantosApi.Endpoints;

public static class ResidenteEndpoints
{
    public static void AddResidente(this WebApplication app)
    {
        app.MapGet("/residentes", GetAsync).RequireAuthorization();
        app.MapGet("/residentes/{id}", GetByIdAsync).RequireAuthorization();
        app.MapGet("/residentes/casa/{id}", GetByCasaIdAsync).RequireAuthorization();
        app.MapPost("/residentes", PostAsync).RequireAuthorization();
        app.MapPut("/residentes/{id}", PutAsync).RequireAuthorization();
        app.MapDelete("/residentes/{id}", DeleteAsync).RequireAuthorization();
    }

    private static async Task<IResult> GetByCasaIdAsync(string id, RecantoDbContext db)
    {
        var objetos = await db.Residentes.Where(r => r.CasaId == Convert.ToInt64(id))
            .Include(r => r.Casa) 
            .ToListAsync();
        return TypedResults.Ok(objetos.Select(x=> new ResidenteDTO(x)));
    }

    private static async Task<IResult> GetAsync(RecantoDbContext db)
    {
        var objetos = await db.Residentes
            .Include(r => r.Casa) 
            .ToListAsync();
        return TypedResults.Ok(objetos.Select(x=> new ResidenteDTO(x)));
    }

   
    private static async Task<IResult> GetByIdAsync(string id, RecantoDbContext db)
    {
        var obj = await db.Residentes
            .Include(r => r.Casa)  
            .FirstOrDefaultAsync(r => r.Id == Convert.ToInt64(id));

        return obj != null ? TypedResults.Ok(new ResidenteDTO(obj)) : TypedResults.NotFound();
    }

    
    private static async Task<IResult> PostAsync(ResidenteDTO objDTO, RecantoDbContext db)
    {
        var existeCpf = await db.Residentes.AnyAsync(r => r.Cpf == objDTO.Cpf); //isso aqui verifica se ja existe o cpf cadastrado
        if (existeCpf)
        {
            return TypedResults.Conflict("CPF já cadastrado.");
        }

        Residente obj = objDTO.GetModel();
        obj.Id = GeradorId.GetId();
        await db.Residentes.AddAsync(obj);
        await db.SaveChangesAsync();

        return TypedResults.Created($"/residentes/{obj.Id}", new ResidenteDTO(obj));
    }

   
    private static async Task<IResult> PutAsync(string id, ResidenteDTO objNovoDTO, RecantoDbContext db)
    {
        
        if (id != objNovoDTO.Id)
        {
            return TypedResults.BadRequest("ID na URL e no corpo não correspondem.");
        }

        var obj = await db.Residentes.FindAsync(Convert.ToInt64(id));
        if (obj == null)
        {
            return TypedResults.NotFound();
        }

        
        obj.Nome = objNovoDTO.Nome;
        obj.Cpf = objNovoDTO.Cpf;
        
        if (Convert.ToInt64(objNovoDTO.CasaId) != obj.CasaId)
        {
            var novaCasa = await db.Casas.FindAsync(Convert.ToInt64(objNovoDTO.CasaId));
            if (novaCasa == null)
            {
                return TypedResults.BadRequest("Casa com o ID especificado não existe.");
            }
            obj.CasaId = Convert.ToInt64(objNovoDTO.CasaId);
            obj.Casa = novaCasa;  
        }

       
        db.Residentes.Update(obj);
        await db.SaveChangesAsync();

        return TypedResults.NoContent();  
    }

 
    private static async Task<IResult> DeleteAsync(string id, RecantoDbContext db)
    {
        var obj = await db.Residentes.FindAsync(Convert.ToInt64(id));
        if (obj == null)
        {
            return TypedResults.NotFound();
        }

        db.Residentes.Remove(obj);  
        await db.SaveChangesAsync();

        return TypedResults.NoContent();  
    }
}
