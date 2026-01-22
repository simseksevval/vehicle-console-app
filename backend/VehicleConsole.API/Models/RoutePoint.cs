namespace VehicleConsole.API.Models;

public class RoutePoint
{
    public int Id { get; set; }
    
    public int RouteId { get; set; }
    
    public double Latitude { get; set; }
    
    public double Longitude { get; set; }
    
    public int Order { get; set; }
    
    // Navigation property
    public VehicleRoute Route { get; set; } = null!;
}