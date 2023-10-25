import { Router } from 'express';
import { z } from 'zod';
import multer from 'multer';
import { Container } from 'typedi';

import IFloorController from '@/controllers/IControllers/IFloorController';
import { validate } from '@/api/middlewares/validate';

import config from '@/config.mjs';

const floorCreateSchema = z.object({
  code: z
    .string()
    .min(1)
    .max(255),
  description: z
    .string()
    .max(255)
    .optional(),
  dimensions: z.object({
    width: z.number().min(1),
    height: z.number().min(1)
  })
});

const floorUpdateSchema = z.object({
  description: z
    .string()
    .max(255)
    .optional(),
  dimensions: z
    .object({
      width: z.number().min(1),
      height: z.number().min(1)
    })
    .optional()
});

export default (app: Router) => {
  const route = Router();

  const ctrl = Container.get(config.controllers.floor.name) as IFloorController;

  route.get('', (req, res, next) => ctrl.getBuildingFloors(req, res, next));
  route.post('', validate(floorCreateSchema), (req, res, next) => ctrl.createFloor(req, res, next));
  route.patch('/:code', multer().single('file'), (req, res, next) =>
    ctrl.uploadMap(req, res, next)
  );
  route.put('/:code', validate(floorUpdateSchema), (req, res, next) =>
    ctrl.updateFloor(req, res, next)
  );

  app.use('/floors', route);
};
