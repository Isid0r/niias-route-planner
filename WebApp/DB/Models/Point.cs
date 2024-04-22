using WebApp.DTO;

namespace WebApp.DB.Models;

/// <summary>
/// Контрольная точка. Позиция в маршруте определяется в массиве маршрута
/// </summary>
public class Point
{
    public Point()
    {
    }

    public Point(PointDTO point)
    {
        Id = point.Id;
        Name = point.Name;
        Height = point.Height;
    }

    /// <summary>
    /// Id
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Название
    /// </summary>
    public string Name { get; set; }

    /// <summary>
    /// Высота точки
    /// </summary>
    public int Height { get; set; }

    /// <summary>
    /// Связь с таблицей <see cref="Track"/>
    /// </summary>
    public virtual ICollection<Track> FirstTracks { get; set; }

    /// <summary>
    /// Связь с таблицей <see cref="Track"/>
    /// </summary>
    public virtual ICollection<Track> SecondTracks { get; set; }
}
