using Microsoft.EntityFrameworkCore;
using RecantosApi.DTOs;
using RecantosApi.Infra;
using RecantosApi.Models;

namespace api.Endpoints
{
    public static class CasaEndpoints
    {
        public static void AdicionarCasaEndpoints(this WebApplication app)
        {
            app.MapGet("/casas", GetAsync).RequireAuthorization();
            app.MapGet("/casas/{id}", GetByIdAsync).RequireAuthorization();
            app.MapPut("/casas/{id}", PutAsync).RequireAuthorization();
            app.MapPost("/casas", PostAsync).RequireAuthorization();
            app.MapDelete("/casas/{id}", DeleteAsync).RequireAuthorization();
            app.MapGet("/casas/semUser", GetCasasSemUsuarioAsync).RequireAuthorization();
        }

        private static async Task<IResult> GetAsync(RecantoDbContext db)
        {
            var casas = await db.Casas
                                .Include(c => c.Residentes)
                                .Include(c => c.Bloco)
                                .ToListAsync();

            var casaDTOs = casas.Select(casa => new CasaDTO(casa));
            return TypedResults.Ok(casaDTOs);
        }

        private static async Task<IResult> GetByIdAsync(long id, RecantoDbContext db)
    {
        var casa = await db.Casas
                        .Include(c => c.Residentes)
                        .Include(c => c.Bloco)
                        .FirstOrDefaultAsync(c => c.Id == id);

        if (casa == null)
        {
            return TypedResults.NotFound("Casa não encontrada.");
        }

        Console.WriteLine("nome bloco casa:" + casa.Bloco.Nome);
        return TypedResults.Ok(new CasaDTO(casa));
    }


        private static async Task<IResult> PostAsync(CasaDTO casaDTO, RecantoDbContext db)
        {
            Casa casa = casaDTO.GetModel();
            
            await db.Casas.AddAsync(casa);
            await db.SaveChangesAsync();

            return TypedResults.Created($"/casas/{casa.Id}", new CasaDTO(casa));
        }

       
        private static async Task<IResult> PutAsync(long id, CasaDTO casaDTO, RecantoDbContext db)
        {
            if (id.ToString() != casaDTO.Id)
            {
                return TypedResults.BadRequest("ID da URL e ID do corpo da requisição não correspondem.");
            }

            var casa = await db.Casas
                               .Include(c => c.Residentes)
                               .FirstOrDefaultAsync(c => c.Id == id);

            if (casa == null)
            {
                return TypedResults.NotFound("Casa não encontrada.");
            }

            
            casa.Numero = casaDTO.Numero;
            casa.BlocoId = Convert.ToInt64(casaDTO.BlocoId);
            // casa.UserId = Convert.ToInt64(casaDTO.UserId);
            casa.Residentes.Clear();

            foreach (var residenteId in casaDTO.Residentes)
            {
                var residenteExistente = await db.Residentes.FindAsync(Convert.ToInt64(residenteId));
                if (residenteExistente != null)
                {
                    casa.Residentes.Add(residenteExistente);
                }
            }

            await db.SaveChangesAsync();
            return TypedResults.NoContent();
        }

        
        private static async Task<IResult> DeleteAsync(long id, RecantoDbContext db)
        {
            var casa = await db.Casas
                               .Include(c => c.Residentes) 
                               .FirstOrDefaultAsync(c => c.Id == id);

            if (casa == null)
            {
                return TypedResults.NotFound("Casa não encontrada.");
            }

            db.Casas.Remove(casa);
            await db.SaveChangesAsync();
            return TypedResults.NoContent();
        }
        private static async Task<IResult> GetCasasSemUsuarioAsync(RecantoDbContext db)
        {
            var casasSemUsuario = await db.Casas
                                   .Where(c => c.Usuario == null)
                                   .Include(c => c.Bloco)
                                   .Include(c => c.Residentes)
                                   .ToListAsync();

            var casaDTOs = casasSemUsuario.Select(casa => new CasaDTO(casa));
            return TypedResults.Ok(casaDTOs);
        }

    }
}
