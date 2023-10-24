import { describe, expect, it } from 'vitest';
import { RoomDimensions } from '../../../../src/domain/room/roomDimensions';

describe('RoomDimensions', () => {
  it('should not allow create dimensions with negative values', () => {
    const result = RoomDimensions.create(-1, -1, 1, 1);

    expect(result.isFailure).toBe(true);
  });

  it('should not allow create dimensions with zero values', () => {
    const result = RoomDimensions.create(0, 0, 1, 1);

    expect(result.isFailure).toBe(true);
  });

  it('should not allow create dimensions with negative width', () => {
    const result = RoomDimensions.create(-1, 1, 1, 1);

    expect(result.isFailure).toBe(true);
  });

  it('should not allow create dimensions with negative height', () => {
    const result = RoomDimensions.create(1, -1, 1, 1);

    expect(result.isFailure).toBe(true);
  });

  it('should not allow create dimensions with zero width', () => {
    const result = RoomDimensions.create(0, 1, 1, 1);

    expect(result.isFailure).toBe(true);
  });

  it('should not allow create dimensions with zero height', () => {
    const result = RoomDimensions.create(1, 0, 1, 1);

    expect(result.isFailure).toBe(true);
  });

  it('should create new dimensions with positive values', () => {
    const result = RoomDimensions.create(1, 1, 1, 1);
    expect(result.isSuccess).toBe(true);
    expect(result.getValue().width).toBe(1);
    expect(result.getValue().height).toBe(1);
  });

  it('should not allow create dimensions with width bigger than max width', () => {
    const result = RoomDimensions.create(2, 1, 1, 1);

    expect(result.isFailure).toBe(true);
  });

  it('should not allow create dimensions with height bigger than max height', () => {
    const result = RoomDimensions.create(1, 2, 1, 1);

    expect(result.isFailure).toBe(true);
  });
});