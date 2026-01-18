using Microsoft.EntityFrameworkCore;
using VehicleConsole.API.Models;

namespace VehicleConsole.API.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<VehicleSetting> VehicleSettings { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed data - tarihleri kaldırdık
        modelBuilder.Entity<VehicleSetting>().HasData(
            new VehicleSetting
            {
                Id = 1,
                Headlights = "Auto",
                FogLights = "Front Fog",
                Angle = 11
            }
        );
    }
}