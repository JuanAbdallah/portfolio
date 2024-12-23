using System;
using RecantosApi.Models;

namespace RecantosApi.DTOs;

public class UserDTO
{

    public UserDTO(Usuario obj){
        Id = obj.Id.ToString();
        Login = obj.Login;
        Senha = obj.Senha;
        Role = obj.Role;
        CasaId = obj.CasaId.ToString();
    
    }
    public UserDTO(){
        
    }
    public string Id { get; set; }

    public string Login { get; set; }

    public string Senha { get; set; }
    
    public string Role { get; set; }

    public string CasaId { get; set; }
    
    public Usuario GetModel(){
        var obj = new Usuario();
        PreencherModel(obj);

        return obj;
    }


    public void PreencherModel(Usuario obj){
        obj.Id = Convert.ToInt64(this.Id);
        obj.Login = this.Login;
        obj.Senha = this.Senha;
        obj.Role = this.Role;
        obj.CasaId = Convert.ToInt64(CasaId);
    }
}
