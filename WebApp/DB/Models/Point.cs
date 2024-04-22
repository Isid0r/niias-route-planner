using WebApp.DTO;

namespace WebApp.DB.Models;

/// <summary>
/// ����������� �����. ������� � �������� ������������ � ������� ��������
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
    /// ��������
    /// </summary>
    public string Name { get; set; }

    /// <summary>
    /// ������ �����
    /// </summary>
    public int Height { get; set; }

    /// <summary>
    /// ����� � �������� <see cref="Track"/>
    /// </summary>
    public virtual ICollection<Track> FirstTracks { get; set; }

    /// <summary>
    /// ����� � �������� <see cref="Track"/>
    /// </summary>
    public virtual ICollection<Track> SecondTracks { get; set; }
}
