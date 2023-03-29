export const RENDER_COLLIDERS = true;

export const ENTITY_NAMES = {
  TEST: "test",
  PLAYER: "shark",
  WARDROBE: "wardrobe",
  BROCCOLI: "broccoli",
};

export type ENTITY_NAMES = typeof ENTITY_NAMES[keyof typeof ENTITY_NAMES];

export type PowerupEffectType = "add-health";

export type PowerupEffectBase<T extends PowerupEffectType, D> = {
  type: T;
  data: D;
};

export type PowerupEffectAddHealth = PowerupEffectBase<
  "add-health",
  { amount: number }
>;

export type PowerupEffect = PowerupEffectAddHealth;

export const POWERUP_EFFECTS: Record<string, PowerupEffect> = {
  "broccoli-add-health": {
    type: "add-health",
    data: {
      amount: 10,
    },
  },
};
