using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecantosApi.Models;

public class Casa
{
    [Key]
    public long Id { get; set; }

    [Required]
    public int Numero { get; set; }

    [ForeignKey("Bloco")]
    public long BlocoId { get; set; }
    public Bloco? Bloco { get; set; }
    // public long UserId { get; set; }
    public Usuario Usuario {get; set;}

    public List<Residente> Residentes { get; set; } = new List<Residente>();
}
