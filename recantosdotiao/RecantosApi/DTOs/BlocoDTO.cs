using System;
using RecantosApi.Models;

namespace RecantosApi.DTOs;

public class BlocoDTO
{

    public BlocoDTO(Bloco obj){
        Id = obj.Id.ToString();
        Nome = obj.Nome;
        CasasId = new List<string>();
        foreach (var casa in obj.Casas)
        {
            CasasId.Add(casa.Id.ToString());
        }
    }
    public BlocoDTO(){
        
    }

    public string Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public List<string> CasasId {get; set;}

    public Bloco GetModel(){
        var obj = new Bloco();
        PreencherModel(obj);
        return obj;
    }

    public void PreencherModel(Bloco obj){

        obj.Id = Convert.ToInt64(this.Id);
        obj.Nome = this.Nome;
        obj.Casas = new List<Casa>();
        foreach (var id in CasasId)
        {
            Casa novaCasa = new Casa();
            novaCasa.Id = Convert.ToInt64(id);
            obj.Casas.Add(novaCasa);
        }
    }

}
