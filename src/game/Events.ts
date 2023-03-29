import { PowerupEffect } from "./Constants";

export enum EventType {
  WEAPON_HIT = "WEAPON_HIT",
  POWERUP_TRIGGERED = "POWERUP_TRIGGERED",
}

export type EventBase<T extends EventType, D> = {
  type: T;
  data: D;
};

export type WeaponHitEvent = EventBase<
  EventType.WEAPON_HIT,
  {
    weaponId: string;
    targetId: string;
  }
>;

export type PowerupTriggeredEvent = EventBase<
  EventType.POWERUP_TRIGGERED,
  {
    effect: PowerupEffect;
  }
>;

export type Event = WeaponHitEvent | PowerupTriggeredEvent;
