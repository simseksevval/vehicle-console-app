using Microsoft.AspNetCore.Mvc;

namespace VehicleConsole.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new { status = "OK", message = "API is running" });
    }
}