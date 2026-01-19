using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VehicleConsole.API.Data;
using VehicleConsole.API.Models;

namespace VehicleConsole.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RoutesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public RoutesController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/routes
    [HttpGet]
    public async Task<ActionResult<IEnumerable<VehicleRoute>>> GetRoutes()
    {
        var routes = await _context.VehicleRoutes
            .Include(r => r.Points)  // RoutePoint'leri de getir
            .OrderBy(r => r.Id)
            .ToListAsync();

        return Ok(routes);
    }

    // GET: api/routes/1
    [HttpGet("{id}")]
    public async Task<ActionResult<VehicleRoute>> GetRoute(int id)
    {
        var route = await _context.VehicleRoutes
            .Include(r => r.Points.OrderBy(p => p.Order))  // Noktaları sıralı getir
            .FirstOrDefaultAsync(r => r.Id == id);

        if (route == null)
        {
            return NotFound();
        }

        return Ok(route);
    }

    // GET: api/routes/active
    [HttpGet("active")]
    public async Task<ActionResult<VehicleRoute>> GetActiveRoute()
    {
        var activeRoute = await _context.VehicleRoutes
            .Include(r => r.Points.OrderBy(p => p.Order))
            .FirstOrDefaultAsync(r => r.IsActive == true);

        if (activeRoute == null)
        {
            return NotFound(new { message = "No active route found" });
        }

        return Ok(activeRoute);
    }
}