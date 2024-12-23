using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecantosApi.Models;

public class Residente
{
    [Key]
    public long Id { get; set; }

    [Required]
    public string Nome { get; set; } = string.Empty;

    [Required]
    [StringLength(11, ErrorMessage = "O CPF deve ter 11 caracteres.")]
    public string Cpf { get; set; } = string.Empty;

    
    [ForeignKey("Casa")]
    public long CasaId { get; set; }
    public Casa? Casa { get; set; }
}
