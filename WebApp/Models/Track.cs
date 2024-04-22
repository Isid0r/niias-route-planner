﻿using WebApp.Enums;

namespace WebApp.Models;

public class Track
{
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
}