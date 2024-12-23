using System;

namespace RecantosApi.DTOs;

public class AvisoDTO
{
    public AvisoDTO(Aviso obj){
        Id = obj.Id.ToString();
        Texto = obj.Texto;
        Data = obj.Data.ToString();
    }
    public AvisoDTO(){}
    public string Id { get; set; }
    public string Texto { get; set; }
    public string Data { get; set; }

    public Aviso GetModel(){
        var aviso = new Aviso();
        PreencherModel(aviso);
        return aviso;
    }

    private void PreencherModel(Aviso obj)
    {
        obj.Id = Convert.ToInt64(this.Id);
        obj.Texto = this.Texto;
        if(string.IsNullOrEmpty(this.Data)){
            obj.Data = DateOnly.FromDateTime(DateTime.Today);
        }else
            obj.Data = DateOnly.Parse(this.Data);
    }
}
