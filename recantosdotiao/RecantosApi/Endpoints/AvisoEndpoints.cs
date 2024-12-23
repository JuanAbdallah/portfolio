using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using RecantosApi.DTOs;
using RecantosApi.Infra;

namespace RecantosApi.Endpoints;

public static class AvisoEndpoints
{
    public static void AdicionarAvisoEndpoints(this WebApplication app){
        app.MapGet("/avisos", GetAsync).RequireAuthorization();
        app.MapPost("/avisos", PostAsync).RequireAuthorization();
        app.MapPut("/avisos/{id}", PutAsync).RequireAuthorization();
        app.MapDelete("/avisos/{id}", DeleteAsync).RequireAuthorization();
        app.MapGet("/avisos/all", GetAllAsync);
    }

    private static async Task<IResult> GetAllAsync(RecantoDbContext db)
    {
        var avisos = await db.Avisos.ToListAsync();
            
        return TypedResults.Ok(avisos.Select(x => new AvisoDTO(x)));
    }

    private static async Task<IResult> GetAsync(RecantoDbContext db)
    {
        var hoje = DateOnly.FromDateTime(DateTime.Now);

        var avisos = await db.Avisos
            .ToListAsync();
            
        return TypedResults.Ok(avisos.Select(x => new AvisoDTO(x)));
    }

    private static async Task<IResult> PostAsync(AvisoDTO avisoDTO, RecantoDbContext db){
        var aviso = avisoDTO.GetModel();
        if(aviso == null)
            return TypedResults.NoContent();
        
        await db.Avisos.AddAsync(aviso);
        await db.SaveChangesAsync();

        return TypedResults.Created($"/avisos/{aviso.Id}", aviso);
    }

    private static async Task<IResult> PutAsync(string id, AvisoDTO avisoDTO, RecantoDbContext db)
    {
        var aviso = await db.Avisos.FindAsync(Convert.ToInt64(id));

        if(aviso == null){
           return TypedResults.NotFound();
        }

        aviso.Texto = avisoDTO.Texto;
        aviso.Data = DateOnly.Parse(avisoDTO.Data);

        db.Avisos.Update(aviso);
        await db.SaveChangesAsync();

        return TypedResults.NoContent();

    }

    private static async Task<IResult> DeleteAsync(string id, RecantoDbContext db)
    {
        var aviso = await db.Avisos.FindAsync(Convert.ToInt64(id));

        if(aviso == null){
           return TypedResults.NotFound();
        }

        db.Avisos.Remove(aviso);
        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }
    
}
