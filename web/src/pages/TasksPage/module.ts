import { useCallback, useEffect, useRef, useState } from "react";
import { useInjection } from "inversify-react";

import { TYPES } from "../../inversify/types";
import { useAuth } from "@/hooks/useAuth";
import { IPaginationDTO } from "@/dto/IPaginationDTO";
import { Floor } from "@/model/Floor";
import { Request } from "@/model/Request";
import { Room } from "@/model/Room";
import { IFloorService } from "@/service/IService/IFloorService";
import { IRoomService } from "@/service/IService/IRoomService";
import { RequestService } from "@/service/requestService";

import { Building } from "../../model/Building";
import { IBuildingService } from "../../service/IService/IBuildingService";

const taskTypes = [
  {
    name: "Pick and Delivery",
    code: "pick_delivery",
  },
  {
    name: "Surveillance",
    code: "surveillance",
  },
];

export const useTasksModule = () => {
  const buildingService = useInjection<IBuildingService>(TYPES.buildingService);
  const floorService = useInjection<IFloorService>(TYPES.floorService);
  const roomService = useInjection<IRoomService>(TYPES.roomService);
  const requestService = useInjection<RequestService>(TYPES.requestService);
  const { id, username, phoneNumber } = useAuth();

  const [requests, setRequests] = useState<Request[]>([]);

  const [page, setPage] = useState<number>(1);
  const [type, setType] = useState<string | null>(null);

  const [buildings, setBuildings] = useState<Building[]>([]);

  const [building1Floors, setBuilding1Floors] = useState<Floor[]>([]);

  const [building1Rooms, setBuilding1Rooms] = useState<Room[]>([]);
  const [building2Rooms, setBuilding2Rooms] = useState<Room[]>([]);

  const [building1Code, setBuilding1Code] = useState<string | null>("");
  const [building2Code, setBuilding2Code] = useState<string | null>("");

  const [stateFilter, setStateFilter] = useState<string | null>("");
  const stateInputRef = useRef<HTMLSelectElement>(null);

  const [userFilter, setUserFilter] = useState<string | null>("");
  const userInputRef = useRef<HTMLSelectElement>(null);

  const typeInputRef = useRef<HTMLSelectElement>(null);

  const floorInputRef = useRef<HTMLSelectElement>(null);
  const room1InputRef = useRef<HTMLSelectElement>(null);
  const room2InputRef = useRef<HTMLSelectElement>(null);

  const pickupUserNameInputRef = useRef<HTMLInputElement>(null);
  const pickupUserPhoneInputRef = useRef<HTMLInputElement>(null);
  const deliveryUserNameInputRef = useRef<HTMLInputElement>(null);
  const deliveryUserPhoneInputRef = useRef<HTMLInputElement>(null);

  const emergencyNameInputRef = useRef<HTMLInputElement>(null);
  const emergencyPhoneInputRef = useRef<HTMLInputElement>(null);

  const confirmationCodeInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  const itemsPerPage = 3;

  const handlePagination = (page: number) => {
    setPage(page);
  };

  async function handleCreate() {
    if (!typeInputRef.current) throw new Error("Type input is not defined");

    switch (typeInputRef.current.value) {
      case "pick_delivery":
        if (
          !pickupUserNameInputRef.current ||
          !pickupUserPhoneInputRef.current ||
          !deliveryUserNameInputRef.current ||
          !deliveryUserPhoneInputRef.current ||
          !room1InputRef.current ||
          !room2InputRef.current ||
          !confirmationCodeInputRef.current ||
          !descriptionInputRef.current ||
          !id
        )
          throw new Error("Some fields are not defined");

        await requestService.createPickAndDeliveryRequest({
          pickupUserName: pickupUserNameInputRef.current.value,
          pickupUserPhoneNumber: pickupUserPhoneInputRef.current.value,
          deliveryUserName: deliveryUserNameInputRef.current.value,
          deliveryUserPhoneNumber: deliveryUserPhoneInputRef.current.value,
          userId: id,
          confirmationCode: confirmationCodeInputRef.current.value,
          description: descriptionInputRef.current.value,
          pickupRoomId: room1InputRef.current?.value,
          deliveryRoomId: room2InputRef.current?.value,
        });
        break;
      case "surveillance":
        if (
          !emergencyNameInputRef.current ||
          !emergencyPhoneInputRef.current ||
          !descriptionInputRef.current ||
          !floorInputRef.current ||
          !id
        )
          throw new Error("Some fields are not defined");

        await requestService.createSurveillanceRequest({
          userName: emergencyNameInputRef.current.value,
          phoneNumber: emergencyPhoneInputRef.current.value,
          description: descriptionInputRef.current.value,
          userId: id,
          floorId: floorInputRef.current?.value,
        });
        break;
    }

    fetchRequests();
  }

  const fetchBuildings = useCallback(async () => {
    try {
      const buildings = await buildingService.getBuildings();
      setBuildings(buildings.data);
    } catch (error) {
      setBuildings([]);
    }
  }, [buildingService]);

  const fetchFloors = useCallback(async () => {
    try {
      if (building1Code) {
        const floors = await floorService.getBuildingFloors(building1Code);
        setBuilding1Floors(floors);
      }
    } catch (error) {
      setBuilding1Floors([]);
    }
  }, [building1Code, floorService]);

  const fetchRooms1 = useCallback(async () => {
    try {
      if (building1Code) {
        const rooms = await roomService.getBuildingRooms(building1Code);
        setBuilding1Rooms(rooms);
      }
    } catch (error) {
      setBuilding1Rooms([]);
    }
  }, [building1Code, roomService]);

  const fetchRooms2 = useCallback(async () => {
    try {
      if (building2Code) {
        const rooms = await roomService.getBuildingRooms(building2Code);
        setBuilding2Rooms(rooms);
      }
    } catch (error) {
      setBuilding2Rooms([]);
    }
  }, [building2Code, roomService]);

  const fetchRequests = useCallback(async () => {
    try {
      const r = await requestService.getAllRequests(
        stateFilter ? "state" : userFilter ? "userId" : undefined,
        stateFilter || userFilter || undefined
      );
      setRequests(r);
    } catch (error) {
      setRequests([]);
    }
  }, [requestService, stateFilter, userFilter]);

  useEffect(() => {
    fetchBuildings();
  }, [fetchBuildings, buildingService]);

  useEffect(() => {
    fetchFloors();
  }, [fetchFloors, floorService]);

  useEffect(() => {
    fetchRooms1();
  }, [fetchRooms1, roomService]);

  useEffect(() => {
    fetchRooms2();
  }, [roomService, fetchRooms2]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests, requestService]);

  const states = [
    {
      name: "Pending",
      code: "pending",
    },
    {
      name: "Accepted",
      code: "accepted",
    },
    {
      name: "Rejected",
      code: "rejected",
    },
    {
      name: "Executed",
      code: "executed",
    },
  ];

  return {
    requests,
    page,
    setPage,
    itemsPerPage,
    handlePagination,
    taskTypes,
    typeInputRef,
    type,
    setType,
    building1Floors,
    setBuilding1Code,
    setBuilding2Code,
    building2Code,
    building1Code,
    buildings,
    building1Rooms,
    building2Rooms,
    handleCreate,
    pickupUserNameInputRef,
    pickupUserPhoneInputRef,
    deliveryUserNameInputRef,
    deliveryUserPhoneInputRef,
    emergencyNameInputRef,
    emergencyPhoneInputRef,
    confirmationCodeInputRef,
    descriptionInputRef,
    floorInputRef,
    room1InputRef,
    room2InputRef,
    username,
    phoneNumber,
    stateFilter,
    setStateFilter,
    userFilter,
    setUserFilter,
    stateInputRef,
    userInputRef,
    states,
  };
};
