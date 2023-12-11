using DDDSample1.Domain.Requests;
using DDDSample1.Domain.Tasks;
using DDDSample1.Infrastructure.Requests;
using DDDSample1.Infrastructure.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Infrastructure
{
  public class DDDSample1DbContext : DbContext
  {
    public DbSet<Request> Requests { get; set; }

    public DbSet<Task> Tasks { get; set; }

    public DDDSample1DbContext(DbContextOptions options) : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.ApplyConfiguration(new RequestEntityTypeConfiguration());
      modelBuilder.ApplyConfiguration(new TaskEntityTypeConfiguration());
    }
  }
}