using WebApp.DB.Models;

namespace WebApp.DTO;

/// <summary>
/// Контрольная точка. Позиция в маршруте определяется в массиве маршрута
/// </summary>
public class PointDTO
{
    public PointDTO()
    {
    }

    public PointDTO(Point point)
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
}
