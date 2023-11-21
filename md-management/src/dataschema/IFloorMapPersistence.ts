export interface IFloorMapPersistence {
  domainId: string;
  maze: {
    size: {
      width: number;
      depth: number;
    };
    map: number[][];
    exits: { x: number; y: number }[];
    elevator: { x: number; y: number };
    exitLocation: { x: number; y: number };
  };
  player: {
    initialPosition: { x: number; y: number };
    initialDirection: number;
  };
  door: {
    url: string;
    scale: {
      x: number;
      y: number;
      z: number;
    };
  };
  elevator: {
    url: string;
    scale: {
      x: number;
      y: number;
      z: number;
    };
  };
  wall: {
    segments: {
      width: number;
      height: number;
      depth: number;
    };
    primaryColor: string;
    maps: {
      color: {
        url: string;
      };
      ao: {
        url: string;
        intensity: number;
      };
      displacement: {
        url: string;
        scale: number;
        bias: number;
      };
      normal: {
        url: string;
        tipo: number;
        scale: {
          x: number;
          y: number;
        };
      };
      bump: {
        url: string;
        scale: number;
      };
      roughness: {
        url: string;
        rough: number;
      };
    };
    wrapS: number;
    wrapT: number;
    repeat: {
      u: number;
      v: number;
    };
    magFilter: number;
    minFilter: number;
    secondaryColor: string;
  };
  ground: {
    size: {
      width: number;
      height: number;
      depth: number;
    };
    segments: {
      width: number;
      height: number;
      depth: number;
    };
    primaryColor: string;
    maps: {
      color: {
        url: string;
      };
      ao: {
        url: string;
        intensity: number;
      };
      displacement: {
        url: string;
        scale: number;
        bias: number;
      };
      normal: {
        url: string;
        tipo: number;
        scale: {
          x: number;
          y: number;
        };
      };
      bump: {
        url: string;
        scale: number;
      };
      roughness: {
        url: string;
        rough: number;
      };
    };
    wrapS: number;
    wrapT: number;
    repeat: {
      u: number;
      v: number;
    };
    magFilter: number;
    minFilter: number;
    secondaryColor: string;
  };
}
