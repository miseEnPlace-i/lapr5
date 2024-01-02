namespace MDTasks.Domain.Room;

public class Room
{
  public string RoomName { get; private set; }

  private Room() { }

  public Room(string roomName)
  {
    RoomName = roomName;
  }

  public void ChangeRoomName(string roomName)
  {
    RoomName = roomName;
  }
}
