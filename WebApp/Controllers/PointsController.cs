using Microsoft.AspNetCore.Mvc;
using WebApp.Models;

namespace WebApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PointsController : ControllerBase
{
    private readonly ILogger<PointsController> _logger;

    public PointsController(ILogger<PointsController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<Point> Get()
    {
        return new List<Point>();
        //return Enumerable.Range(1, 5).Select(index => new Point
        //{
        //    Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
        //    TemperatureC = Random.Shared.Next(-20, 55),
        //    Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        //})
        //.ToArray();
    }

    //[HttpGet(Name = "GetWeatherForecast")]
    //public IEnumerable<Point> Get()
    //{
    //    return Enumerable.Range(1, 5).Select(index => new Point
    //    {
    //        Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
    //        TemperatureC = Random.Shared.Next(-20, 55),
    //        Summary = Summaries[Random.Shared.Next(Summaries.Length)]
    //    })
    //    .ToArray();
    //}
}
