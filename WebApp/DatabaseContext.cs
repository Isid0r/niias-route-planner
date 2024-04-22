using Microsoft.EntityFrameworkCore;
using WebApp.Models;

namespace WebApp;

public class DatabaseContext : DbContext
{
    public DatabaseContext(DbContextOptions<DatabaseContext> options)
        : base(options)
    {
    }

    public DbSet<Point> Points { get; set; } = null!;

    public DbSet<Track> Tracks { get; set; } = null!;
}
