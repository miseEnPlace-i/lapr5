using System.Threading.Tasks;
using MDTasks.Domain.DTO;
using MDTasks.Domain.Requests;

namespace MDTasks.Services;

public interface IRequestService
{
  Task<PaginationDTO<RequestDTO>> GetAll(int page, int limit);
  Task<PaginationDTO<RequestDTO>> GetAllSurveillance(int page, int limit);
  Task<PaginationDTO<RequestDTO>> GetAllPickAndDelivery(int page, int limit);
  Task<PaginationDTO<RequestDTO>> GetByState(RequestState state, int page, int limit);
  Task<RequestDTO> GetById(RequestId id);
  Task<RequestDTO> AddSurveillanceRequest(SurveillanceRequestDTO dto);
  Task<RequestDTO> AddPickAndDeliveryRequest(PickAndDeliveryRequestDTO dto);
  Task<RequestDTO> AcceptRequest(RequestId id);
  Task<RequestDTO> RejectRequest(RequestId id);
  Task<RequestDTO> Update(RequestDTO dto);
  Task<RequestDTO> Delete(RequestId dto);
}
