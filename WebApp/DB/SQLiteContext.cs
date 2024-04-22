using Microsoft.EntityFrameworkCore;
using WebApp.DB.Models;

namespace WebApp.DB;

public class SQLiteContext : DbContext
{
    public SQLiteContext(DbContextOptions<SQLiteContext> options)
        : base(options)
    {
        Database.EnsureCreated();
    }

    public DbSet<Point> Points { get; set; }

    public DbSet<Track> Tracks { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Create();
    }
}
