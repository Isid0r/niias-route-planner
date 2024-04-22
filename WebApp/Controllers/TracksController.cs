using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.DB;
using WebApp.DB.Models;
using WebApp.DTO;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TracksController : ControllerBase
    {
        private readonly SQLiteContext _context;

        public TracksController(SQLiteContext context)
        {
            _context = context;
        }

        // GET: api/Tracks
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<TrackDTO>>> GetTracks()
        {
            return await _context.Tracks.Select(q => new TrackDTO(q)).ToListAsync();
        }

        // GET: api/Tracks/5
        [HttpGet]
        public async Task<ActionResult<TrackDTO>> GetTrack(int firstId, int secondId)
        {
            var track = await _context.Tracks.FindAsync(firstId, secondId);

            if (track == null)
            {
                return NotFound();
            }

            return new TrackDTO(track);
        }

        // PUT: api/Tracks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        public async Task<IActionResult> PutTrack(int firstId, int secondId, TrackDTO track)
        {
            if (firstId != track.FirstId && secondId != track.SecondId)
            {
                return BadRequest();
            }

            _context.Entry(new Track(track)).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TrackExists(firstId, secondId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Tracks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Track>> PostTrack(TrackDTO track)
        {
            _context.Tracks.Add(new Track(track));
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TrackExists(track.FirstId, track.SecondId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTrack", new { id = track.FirstId }, track);
        }

        // DELETE: api/Tracks
        [HttpDelete]
        public async Task<IActionResult> DeleteTrack(int firstId, int secondId)
        {
            var track = await _context.Tracks.FindAsync(firstId, secondId);
            if (track == null)
            {
                return NotFound();
            }

            _context.Tracks.Remove(track);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TrackExists(int firstId, int secondId)
        {
            return _context.Tracks.Any(e => e.FirstId == firstId && e.SecondId == secondId);
        }
    }
}
