export const ENTITY_NAMES = {
    TEST: "test",
    PLAYER: "shark",
    WARDROBE: "wardrobe",
    BROCCOLI: "broccoli",
  };
  
  export type ENTITY_NAMES = typeof ENTITY_NAMES[keyof typeof ENTITY_NAMES];
  