using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.DTO;
using DDDSample1.Domain.Requests;
using Microsoft.AspNetCore.Mvc;

public interface IRequestService
{
  Task<List<RequestDTO>> GetAll();
  Task<List<RequestDTO>> GetRequestsByState(string state);
  Task<List<RequestDTO>> GetRequestsByUserId(string userId);
  Task<List<SurveillanceRequestDTO>> GetAllSurveillance();
  Task<List<PickDeliveryRequestDTO>> GetAllPickAndDelivery();
  Task<RequestDTO> GetById(RequestId id);
  Task<RequestDTO> AddSurveillanceRequest(SurveillanceRequestDTO dto);
  Task<RequestDTO> AddPickAndDeliveryRequest(PickDeliveryRequestDTO dto);
  Task<RequestDTO> Update(RequestDTO dto);
  Task<RequestDTO> Put(RequestDTO dto);
  Task<RequestDTO> Delete(RequestId id);

}
