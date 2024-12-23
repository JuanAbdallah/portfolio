using Microsoft.EntityFrameworkCore;
using RecantosApi.DTOs;
using RecantosApi.Infra;
using RecantosApi.Models;

namespace api.Endpoints
{
    public static class BlocoEndpoints
    {
        public static void AdicionarBlocoEndpoints(this WebApplication app)
        {
            app.MapGet("/blocos", GetAsync).RequireAuthorization();
            app.MapGet("/blocos/{id}", GetByIdAsync).RequireAuthorization();
            app.MapPut("/blocos/{id}", PutAsync).RequireAuthorization();
            app.MapPost("/blocos", PostAsync).RequireAuthorization();
            app.MapDelete("/blocos/{id}", DeleteAsync).RequireAuthorization();
        }

        
        private static async Task<IResult> GetAsync(RecantoDbContext db)
        {
            var blocos = await db.Blocos
                                 .Include(b => b.Casas)  
                                 .ToListAsync();
            return TypedResults.Ok(blocos.Select(x=> new BlocoDTO(x)));
        }

        
        private static async Task<IResult> GetByIdAsync(long id, RecantoDbContext db)
        {
            var bloco = await db.Blocos
                                .Include(b => b.Casas)  
                                .FirstOrDefaultAsync(b => b.Id == id);

            return bloco is not null ? TypedResults.Ok(new BlocoDTO(bloco)) : TypedResults.NotFound();
        }

       
        private static async Task<IResult> PostAsync(BlocoDTO blocoDTO, RecantoDbContext db)
        {
            Bloco bloco = blocoDTO.GetModel();
            var novasCasas = new List<Casa>();
            foreach (var casa in bloco.Casas)
            {
                var novaCasa = await db.Casas.FindAsync(Convert.ToInt64(casa.Id));
                if (novaCasa != null)
                {
                    novasCasas.Add(novaCasa);
                }
            }
            bloco.Casas = novasCasas;

            await db.Blocos.AddAsync(bloco);
            await db.SaveChangesAsync();

            return TypedResults.Created($"/blocos/{bloco.Id}", bloco);
        }


       
        private static async Task<IResult> PutAsync(long id, BlocoDTO blocoNovoDTO, RecantoDbContext db)
        {
            if (id != Convert.ToInt64(blocoNovoDTO.Id))
            {
                return TypedResults.BadRequest("ID do bloco na URL e no corpo não correspondem.");
            }

            var bloco = await db.Blocos.Include(b => b.Casas).FirstOrDefaultAsync(b => b.Id == id);
            if (bloco == null)
            {
                return TypedResults.NotFound();
            }

            bloco.Nome = blocoNovoDTO.Nome;

            // Atualizar casas associadas
            bloco.Casas.Clear();
            foreach (var casaId in blocoNovoDTO.CasasId)
            {
                var casaExistente = await db.Casas.FindAsync(Convert.ToInt64(casaId));
                if (casaExistente != null)
                {
                    bloco.Casas.Add(casaExistente);
                }
                else
                {
                    return TypedResults.BadRequest($"Casa com ID {casaId} não encontrada.");
                }
            }

            await db.SaveChangesAsync();
            return TypedResults.NoContent();
        }


      
        private static async Task<IResult> DeleteAsync(string id, RecantoDbContext db)
        {
            var bloco = await db.Blocos.FindAsync(Convert.ToInt64(id));
            if (bloco == null)
            {
                return TypedResults.NotFound();
            }

            
            if (bloco.Casas.Any())
            {
                return TypedResults.BadRequest("Não é possível excluir um bloco com casas associadas.");
            }

            db.Blocos.Remove(bloco);
            await db.SaveChangesAsync();
            return TypedResults.NoContent();
        }
    }
}
