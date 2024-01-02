using System.Threading.Tasks;
using MDTasks.DTO;
using MDTasks.Domain.Task;

namespace MDTasks.Services;

public interface ITaskService
{

  Task<TaskDTO> Create(TaskDTO dto);
  Task<PaginationDTO<TaskDTO>> GetAll(int page, int limit);
  Task<PaginationDTO<TaskDTO>> GetWithDeviceId(string deviceId);
  Task<PaginationDTO<SurveillanceTaskDTO>> GetAllSurveillance(int page, int limit);
  Task<PaginationDTO<PickDeliveryTaskDTO>> GetAllPickAndDelivery(int page, int limit);
  Task<TaskDTO> GetById(TaskId id);
  Task<SequenceDTO> GetApprovedTasksSequence(string deviceId);
  Task<TaskDTO> Delete(TaskId id);
  Task<TaskDTO> FinishTask(TaskId id);
}