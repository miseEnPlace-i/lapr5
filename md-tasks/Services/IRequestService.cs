using System.Threading.Tasks;
using DDDNetCore.Domain.Request;
using DDDSample1.Domain.DTO;
using DDDSample1.Domain.Requests;

namespace DDDNetCore.Services
{
  public interface IRequestService
  {
    Task<PaginationDTO<RequestDTO>> GetAllAsync(int page, int limit);
    Task<RequestDTO> AddSurveillanceTask(SurveillanceRequestDTO dto);
    Task<RequestDTO> AddPickAndDeliveryTask(PickAndDeliveryRequestDTO dto);
    Task<PaginationDTO<RequestDTO>> GetRequestsByState(RequestState state, int page, int limit);
  }
}
