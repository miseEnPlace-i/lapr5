import { Container } from '@freshgum/typedi';
import { Router } from 'express';
import { z } from 'zod';

import { validate } from '@/api/middlewares/validate';

import DeviceModelController from '@/controllers/deviceModelController';

const deviceModelCreateSchema = z.object({
  code: z
    .string()
    .min(1)
    .max(25),
  brand: z
    .string()
    .min(1)
    .max(50),
  name: z
    .string()
    .min(1)
    .max(100),
  type: z.enum(['robot', 'drone']),
  capabilities: z.array(z.enum(['pick_delivery', 'surveillance']))
});

export default (app: Router) => {
  const route = Router();

  const ctrl = Container.get(DeviceModelController);

  route.post('', validate(deviceModelCreateSchema), (req, res, next) =>
    ctrl.createDeviceModel(req, res, next)
  );

  app.use('/device-models', route);
};
