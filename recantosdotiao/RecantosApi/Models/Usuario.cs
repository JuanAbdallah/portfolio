using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecantosApi.Models;

public class Usuario
{
    [Key]
    public long Id { get; set; } 
    
    public string Login { get; set; }
    
    public string Senha { get; set; }

    public string Role { get; set; }

    [ForeignKey("Casa")]
    public long CasaId { get; set; }
    public Casa? Casa { get; set; }
}
