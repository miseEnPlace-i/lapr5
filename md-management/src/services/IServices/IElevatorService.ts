import { Result } from '../../core/logic/Result';
import { IElevatorDTO } from '../../dto/IElevatorDTO';

export default interface IElevatorService {
  createElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>>;
  getElevator(buildingCode: string): Promise<Result<IElevatorDTO>>;
}
