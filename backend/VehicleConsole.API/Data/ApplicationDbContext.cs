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
    public DbSet<VehicleRoute> VehicleRoutes { get; set; }
    public DbSet<RoutePoint> RoutePoints { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // VehicleSetting seed data
        modelBuilder.Entity<VehicleSetting>().HasData(
            new VehicleSetting
            {
                Id = 1,
                Headlights = "Auto",
                FogLights = "Front Fog",
                Angle = 11
            }
        );

        // VehicleRoute seed data
        modelBuilder.Entity<VehicleRoute>().HasData(
            new VehicleRoute
            {
                Id = 1,
                Name = "Ankara City Route",
                IsActive = true,
                CreatedAt = new DateTime(2026, 1, 19, 0, 0, 0, DateTimeKind.Utc)
            }
        );

        // RoutePoint seed data (10 nokta)
        modelBuilder.Entity<RoutePoint>().HasData(
            new RoutePoint { Id = 1, RouteId = 1, Latitude = 39.9334, Longitude = 32.8597, Order = 1 },
            new RoutePoint { Id = 2, RouteId = 1, Latitude = 39.9272, Longitude = 32.8644, Order = 2 },
            new RoutePoint { Id = 3, RouteId = 1, Latitude = 39.9208, Longitude = 32.8541, Order = 3 },
            new RoutePoint { Id = 4, RouteId = 1, Latitude = 39.9150, Longitude = 32.8400, Order = 4 },
            new RoutePoint { Id = 5, RouteId = 1, Latitude = 39.9100, Longitude = 32.8300, Order = 5 },
            new RoutePoint { Id = 6, RouteId = 1, Latitude = 39.9050, Longitude = 32.8200, Order = 6 },
            new RoutePoint { Id = 7, RouteId = 1, Latitude = 39.9000, Longitude = 32.8100, Order = 7 },
            new RoutePoint { Id = 8, RouteId = 1, Latitude = 39.8950, Longitude = 32.8000, Order = 8 },
            new RoutePoint { Id = 9, RouteId = 1, Latitude = 39.8900, Longitude = 32.7900, Order = 9 },
            new RoutePoint { Id = 10, RouteId = 1, Latitude = 39.8850, Longitude = 32.7800, Order = 10 }
        );

        // İlişkiler
        modelBuilder.Entity<RoutePoint>()
            .HasOne(rp => rp.Route)
            .WithMany(r => r.Points)
            .HasForeignKey(rp => rp.RouteId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}