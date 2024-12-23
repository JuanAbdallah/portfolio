using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecantosApi.Models;

public class Bloco
{
    [Key]
    public long Id { get; set; }
    
    [Required]
    public string Nome { get; set; } = string.Empty;

    public List<Casa> Casas { get; set; } = [];
}
