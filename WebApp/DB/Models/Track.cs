﻿using WebApp.DTO;
using WebApp.Enums;

namespace WebApp.DB.Models;

/// <summary>
/// Отрезок. Определяет характеристики участка маршрута между 2 соседними точками  
/// </summary>
public class Track
{
    public Track()
    {
    }

    public Track(TrackDTO track)
    {
        FirstId = track.FirstId;
        SecondId = track.SecondId;
        Distance = track.Distance;
        Surface = track.Surface;
        MaxSpeed = track.MaxSpeed;
    }

    /// <summary>
    /// Id первой точки
    /// </summary>
    public int FirstId { get; set; }

    /// <summary>
    /// Id второй точки
    /// </summary>
    public int SecondId { get; set; }

    /// <summary>
    /// Расстояние между точками
    /// </summary>
    public int Distance { get; set; }

    /// <summary>
    /// Тип поверхности на отрезке
    /// </summary>
    public Surface Surface { get; set; }

    /// <summary>
    /// Максимально допустимая скорость на отрезке
    /// </summary>
    public MaxSpeed MaxSpeed { get; set; }

    /// <summary>
    /// Связь с таблицей <see cref="Point"/>
    /// </summary>
    public virtual Point FirstPoint { get; set; } = null!;

    /// <summary>
    /// Связь с таблицей <see cref="Point"/>
    /// </summary>
    public virtual Point SecondPoint { get; set; } = null!;
}
