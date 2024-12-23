using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using RecantosApi.Models;

namespace RecantosApi.Infra;

public class RecantoDbContext : DbContext
{
    
    public DbSet<Residente> Residentes { get; set; }
    public DbSet<Casa> Casas { get; set; }
    public DbSet<Bloco> Blocos { get; set; }
    public DbSet<Usuario> Usuarios {get;set;}
    public DbSet<Aviso> Avisos { get; set; }

    
    private readonly string caminho = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "recantos.db");

    public RecantoDbContext(DbContextOptions<RecantoDbContext> options) : base(options) {}

    
    public RecantoDbContext() {}

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseSqlite($"Data Source={caminho}");
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Casa>()
            .HasOne(c => c.Bloco)
            .WithMany(b => b.Casas)
            .HasForeignKey(c => c.BlocoId);

        modelBuilder.Entity<Residente>()
            .HasOne(r => r.Casa)
            .WithMany(c => c.Residentes)
            .HasForeignKey(r => r.CasaId);
        modelBuilder.Entity<Casa>()
            .HasIndex(c => c.Numero)
            .IsUnique();
        modelBuilder.Entity<Casa>()
            .HasOne(c => c.Usuario)
            .WithOne(u => u.Casa)
            .HasForeignKey<Usuario>(u => u.CasaId);
        modelBuilder.Entity<Usuario>()
            .HasIndex(u => u.Login)
            .IsUnique();
    }
}
