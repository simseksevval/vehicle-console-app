namespace VehicleConsole.API.Models;

public class VehicleRoute 
{
    public int Id { get; set; }
    
    public string Name { get; set; } = string.Empty;
    
    public bool IsActive { get; set; } = false;
    
    public DateTime? CreatedAt { get; set; }
    
    // Navigation property
    public ICollection<RoutePoint> Points { get; set; } = new List<RoutePoint>();
}