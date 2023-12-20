namespace DDDSample1.Domain.DTO;

public abstract class RequestDTO
{
  public string Id { get; set; }

  public string UserEmail { get; set; }

  public string RequestedAt { get; set; }

  public StateEnum State { get; set; }

  public RequestDTO(string userEmail, string requestedAt)
  {
    this.UserEmail = userEmail;
    this.RequestedAt = requestedAt;
  }

  public RequestDTO(string id, string userEmail, string requestedAt, StateEnum state)
  {
    this.Id = id;
    this.UserEmail = userEmail;
    this.RequestedAt = requestedAt;
    this.State = state;
  }
}