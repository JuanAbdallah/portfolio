using System;
using RecantosApi.Models;

namespace RecantosApi.DTOs;

public class CasaDTO
{
    public CasaDTO(Casa obj)
    {
        Id = obj.Id.ToString();
        Numero = obj.Numero;
        BlocoId = obj.BlocoId.ToString();
        BlocoNome = obj.Bloco.Nome;
        UserId = obj.Usuario?.Id.ToString();
        Residentes = obj.Residentes.Select(r => r.Id.ToString()).ToList(); 
    }

    public CasaDTO()
    {
        Residentes = new List<string>();
    }

    public string? Id { get; set; }
    public int Numero { get; set; }
    public string? BlocoId { get; set; }
    public string? BlocoNome {get; set;}
    public string? UserId { get; set; }
    public List<string> Residentes { get; set; } 

    public Casa GetModel()
    {
        var obj = new Casa();
        PreencherModel(obj);
        return obj;
    }

    public void PreencherModel(Casa obj)
    {
        obj.Id = string.IsNullOrWhiteSpace(this.Id) ? 0 : Convert.ToInt64(this.Id);

        obj.Numero = this.Numero;

        if (!string.IsNullOrWhiteSpace(this.BlocoId))
        {
            obj.BlocoId = Convert.ToInt64(this.BlocoId);
        }
        obj.Usuario = string.IsNullOrWhiteSpace(this.UserId) ? null : new Usuario { Id = Convert.ToInt64(this.UserId) };

        obj.Residentes = Residentes
            .Where(r => !string.IsNullOrWhiteSpace(r))
            .Select(r => new Residente { Id = Convert.ToInt64(r) })
            .ToList();
    }
}
