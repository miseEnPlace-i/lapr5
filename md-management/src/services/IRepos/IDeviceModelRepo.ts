import { DeviceModel } from '@/domain/deviceModel/device-model';
import { Repo } from '../../core/infra/Repo';
import { DeviceModelName } from '@/domain/deviceModel/deviceModelName';
import { DeviceModelCode } from '@/domain/deviceModel/deviceModelCode';

export default interface IDeviceModelRepo extends Repo<DeviceModel> {
  save(deviceModel: DeviceModel): Promise<DeviceModel>;
  findByName(name: DeviceModelName | string): Promise<DeviceModel | null>;
  findByCode(code: DeviceModelCode | string): Promise<DeviceModel | null>;
}