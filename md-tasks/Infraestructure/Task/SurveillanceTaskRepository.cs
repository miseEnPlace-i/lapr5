using DDDSample1.Infrastructure.Shared;
using DDDSample1.Domain.DeviceTasks;
using DDDSample1.Domain.DeviceTasks.SurveillanceTask;

namespace DDDSample1.Infrastructure.DeviceTasks;

public class SurveillanceTaskRepository : BaseRepository<SurveillanceTask, DeviceTaskId>, ISurveillanceTaskRepository
{
  public SurveillanceTaskRepository(MySQLDbContext context) : base(context.SurveillanceTasks) { }
}