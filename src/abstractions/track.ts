import { MaxSpeed } from "../enums/max-speed";
import { Surface } from "../enums/surface";

// Отрезок. Определяет характеристики участка маршрута между 2 соседними точками  
export interface Track {
    // id первой точки
    firstId: number;
    // id второй точки
    secondId: number;
    // расстояние между точками
    distance: number;
    // тип поверхности на отрезке
    surface: Surface;
    // максимально допустимая скорость на отрезке
    maxSpeed: MaxSpeed;
  }