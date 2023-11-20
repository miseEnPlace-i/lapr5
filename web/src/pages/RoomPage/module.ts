import { useCallback, useEffect, useRef, useState } from "react";
import { useInjection } from "inversify-react";
import { useParams } from "react-router-dom";

import { TYPES } from "../../inversify/types";
import { Floor } from "@/model/Floor";
import { IFloorService } from "@/service/IService/IFloorService";

import { Building } from "../../model/Building";
import { IBuildingService } from "../../service/IService/IBuildingService";
import { IRoomService } from "@/service/IService/IRoomService";
import { Room } from "@/model/Room";

export const useRoomPageModule = () => {
  const buildingService = useInjection<IBuildingService>(TYPES.buildingService);
  const floorService = useInjection<IFloorService>(TYPES.floorService);
  const roomService = useInjection<IRoomService>(TYPES.roomService);
  console.log("useRoomPageModule");

  const { buildingCode, floorCode } = useParams();

  const [building, setBuilding] = useState<Building>();
  const [room, setRoom] = useState<Room>();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [floor, setFloor] = useState<Floor>();

  const roomNameInputRef = useRef<HTMLInputElement>(null);
  const roomDescriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const roomCategoryInputRef = useRef<HTMLInputElement>(null);
  const roomWidthInputRef = useRef<HTMLInputElement>(null);
  const roomLengthInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchData() {
      if (!buildingCode || !floorCode) return;

      fetchBuilding(buildingCode);
      fetchFloor(buildingCode, floorCode);
      fetchRooms(buildingCode, floorCode);

    }

    fetchData();
  }, [buildingCode, buildingService, floorService]);


  const fetchRoom = useCallback(
    async (buildingCode: string, floorCode: string, roomName: string) => {
      const room = await roomService.getRoomWithName(buildingCode, floorCode, roomName);
      setRoom(room);
    },
    [roomService]
  );


  const fetchRooms = useCallback(
    async (buildingCode: string, floorCode: string) => {
      const rooms = await roomService.getFloorRooms(buildingCode, floorCode);
      setRooms(rooms);
    },
    [roomService]
  );


  const fetchBuilding = useCallback(
    async (buildingCode: string) => {
      const building = await buildingService.getBuildingWithCode(buildingCode);
      setBuilding(building);
    },
    [buildingService]
  );

  const fetchFloor = useCallback(
    async (buildingCode: string, floorCode: string) => {
      const floor = await floorService.getFloor(buildingCode, floorCode);
      setFloor(floor);
    },
    [floorService]
  );

  async function handleCreate() {
    if (!buildingCode) throw new Error("No building code provided");

    if (!roomNameInputRef.current?.value) throw new Error("No floor code provided");
    if (!roomLengthInputRef.current?.value) throw new Error("No floor length provided");
    if (!roomWidthInputRef.current?.value) throw new Error("No floor width provided");
    if (!roomCategoryInputRef.current?.value) throw new Error("No floor category provided");
    if (!floorCode) throw new Error("No floor code provided");

    const r: Room = {
      name: roomNameInputRef.current.value,
      description: roomDescriptionInputRef.current?.value,
      category: roomCategoryInputRef.current?.value,
      dimensions: {
        width: Number(roomWidthInputRef.current.value),
        length: Number(roomLengthInputRef.current.value),
      },
      floorCode: floorCode,
    };

    await roomService.createRoom(buildingCode, floorCode, r);
  }

  async function handleSave() {
    if (!room) return await handleCreate();

    if (buildingCode && floorCode && room.name) fetchRoom(buildingCode, floorCode, room.name)
  }

  return {
    building,
    floor,
    handleSave,
    handleCreate,
    roomNameInputRef,
    roomDescriptionInputRef,
    roomCategoryInputRef,
    roomWidthInputRef,
    roomLengthInputRef,
    room,
    rooms,
  };
};