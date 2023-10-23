import mongoose from 'mongoose';
import { IFloorPersistence } from '../../dataschema/IFloorPersistence';

const FloorSchema = new mongoose.Schema(
  {
    domainId: {
      type: String,
      unique: true
    },
    code: {
      type: String,
      unique: true
    },

    description: String,

    dimensions: {
      width: Number,
      height: Number
    },

    building: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Building'
    },

    connectors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Connector'
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model<IFloorPersistence & mongoose.Document>('Floor', FloorSchema);
