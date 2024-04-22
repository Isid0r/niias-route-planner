namespace WebApp.Models;

/// <summary>
/// Контрольная точка. Позиция в маршруте определяется в массиве маршрута
/// </summary>
public class Point
{
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
