export enum EventType {
  AnimationEnd = "animation.end",
}

export type EventBase<T extends EventType, D> = {
  type: T;
  data: D;
};

export type AnimationEndEvent = EventBase<
  EventType.AnimationEnd,
  {
    entityId: string;
  }
>;

export type Event = AnimationEndEvent;
