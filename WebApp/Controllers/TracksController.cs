using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using WebApp.Models;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TracksController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Track> Get()
        {
            return [new Track { Surface = Enums.Surface.Asphalt }];
        }

        [HttpGet]
        public Track Get([Required] int firstId, [Required] int secondId)
        {
            return new Track { Surface = Enums.Surface.Asphalt };
        }
    }
}
