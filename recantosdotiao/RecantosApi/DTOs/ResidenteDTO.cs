using System;
using RecantosApi.Models;

namespace RecantosApi.DTOs;

public class ResidenteDTO
{
    public ResidenteDTO(Residente obj){
        Id = obj.Id.ToString();
        Nome = obj.Nome;
        Cpf = obj.Cpf;
        CasaId = obj.CasaId.ToString();
    }

    public ResidenteDTO(){
        
    }
    public string Id { get; set; }
    public string Nome { get; set; }
    public string Cpf { get; set; }
    public string CasaId {get; set;}

    public Residente GetModel(){
        var obj = new Residente();
        PreencherModel(obj);

        return obj;
    }


    public void PreencherModel(Residente obj){
        obj.Id = Convert.ToInt64(this.Id);
        obj.Nome = this.Nome;
        obj.Cpf = this.Cpf;
        obj.CasaId =Convert.ToInt64(this.CasaId);
    }
}
