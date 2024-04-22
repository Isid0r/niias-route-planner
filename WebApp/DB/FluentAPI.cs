using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebApp.DB.Models;
using WebApp.Enums;

namespace WebApp.DB;

public static class FluentAPI
{
    public static void Create(this ModelBuilder modelBuilder)
    {
        modelBuilder.CreatePointTable();
        modelBuilder.CreateTrackTable();
    }

    private static void CreatePointTable(this ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Point>(entity =>
        {
            entity.ToTable("point");

            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id)
                .HasColumnName("id");

            entity.Property(e => e.Name)
                .HasColumnName("name")
                .IsRequired();

            entity.Property(e => e.Height)
                .HasColumnName("height")
                .IsRequired();
        });
    }

    private static void CreateTrackTable(this ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Track>(entity =>
        {
            entity.ToTable("track");

            entity.HasKey(e => new { e.FirstId, e.SecondId });

            entity.Property(e => e.FirstId)
                .HasColumnName("id");

            entity.Property(e => e.FirstId)
                .HasColumnName("id");

            entity.Property(e => e.Distance)
                .HasColumnName("distance")
                .IsRequired();

            entity.Property(e => e.Surface)
                .HasColumnName("surface")
                .IsRequired()
                .HasConversion(new EnumToStringConverter<Surface>());

            entity.Property(e => e.MaxSpeed)
                .HasColumnName("maxSpeed")
                .IsRequired()
                .HasConversion(new EnumToStringConverter<MaxSpeed>());

            entity.HasOne(e => e.FirstPoint)
                .WithMany(e => e.FirstTracks)
                .HasForeignKey(e => e.FirstId)
                .IsRequired();

            entity.HasOne(e => e.SecondPoint)
                .WithMany(e => e.SecondTracks)
                .HasForeignKey(e => e.SecondId)
                .IsRequired();
        });
    }
}
