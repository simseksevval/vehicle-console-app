using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VehicleConsole.API.Data;
using VehicleConsole.API.Models;

namespace VehicleConsole.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SettingsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public SettingsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/settings
    [HttpGet]
    public async Task<ActionResult<IEnumerable<VehicleSetting>>> GetSettings()
    {
        var settings = await _context.VehicleSettings.ToListAsync();
        return Ok(settings);
    }

    // GET: api/settings/1
    [HttpGet("{id}")]
    public async Task<ActionResult<VehicleSetting>> GetSetting(int id)
    {
        var setting = await _context.VehicleSettings.FindAsync(id);

        if (setting == null)
        {
            return NotFound();
        }

        return Ok(setting);
    }

    // PUT: api/settings/1
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSetting(int id, VehicleSetting setting)
    {
        if (id != setting.Id)
        {
            return BadRequest();
        }

        // UpdatedAt'i güncelle
        setting.UpdatedAt = DateTime.UtcNow;

        _context.Entry(setting).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!SettingExists(id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    private bool SettingExists(int id)
    {
        return _context.VehicleSettings.Any(e => e.Id == id);
    }
}