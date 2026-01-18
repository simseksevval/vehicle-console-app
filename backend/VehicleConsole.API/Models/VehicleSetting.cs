namespace VehicleConsole.API.Models;

public class VehicleSetting
{
    public int Id { get; set; }
    
    public string Headlights { get; set; } = "Auto";
    
    public string FogLights { get; set; } = "Front Fog";
    
    public int Angle { get; set; } = 11;
    
    public DateTime? CreatedAt { get; set; }
    
    public DateTime? UpdatedAt { get; set; }
}