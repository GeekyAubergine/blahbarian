import { Animation, AnimationTemplate } from "./Animation";
import { Renderer } from "./Renderer";
import { NEAR_ZERO, Vector } from "./Vector";

export enum Movement {
  IDLE = "IDLE",
  UP = "UP",
  UP_RIGHT = "UP_RIGHT",
  RIGHT = "RIGHT",
  DOWN_RIGHT = "DOWN_RIGHT",
  DOWN = "DOWN",
  DOWN_LEFT = "DOWN_LEFT",
  LEFT = "LEFT",
  UP_LEFT = "UP_LEFT",
}

export type MovementToAnimationTemplateMap = Record<
  Movement,
  AnimationTemplate | null
>;

export type MovementToAnimationConfig = Record<Movement, string>;

export function movementToAnimationFromConfig(
  renderer: Renderer,
  config: MovementToAnimationConfig
): MovementToAnimationTemplateMap {
  return {
    [Movement.IDLE]: renderer.findAnimationTemplate(config[Movement.IDLE]),
    [Movement.UP]: renderer.findAnimationTemplate(config[Movement.UP]),
    [Movement.UP_RIGHT]: renderer.findAnimationTemplate(
      config[Movement.UP_RIGHT]
    ),
    [Movement.RIGHT]: renderer.findAnimationTemplate(config[Movement.RIGHT]),
    [Movement.DOWN_RIGHT]: renderer.findAnimationTemplate(
      config[Movement.DOWN_RIGHT]
    ),
    [Movement.DOWN]: renderer.findAnimationTemplate(config[Movement.DOWN]),
    [Movement.DOWN_LEFT]: renderer.findAnimationTemplate(
      config[Movement.DOWN_LEFT]
    ),
    [Movement.LEFT]: renderer.findAnimationTemplate(config[Movement.LEFT]),
    [Movement.UP_LEFT]: renderer.findAnimationTemplate(
      config[Movement.UP_LEFT]
    ),
  };
}

export function animationForMovement(
  movement: Movement,
  movementMap: MovementToAnimationTemplateMap
): AnimationTemplate | null {
  return movementMap[movement];
}

export function movementFromVector(vector: Vector): Movement {
  const { x, y } = vector;

  if (Math.abs(x) < NEAR_ZERO && Math.abs(y) < NEAR_ZERO) {
    return Movement.IDLE;
  }

  if (x === 0) {
    return y < 0 ? Movement.UP : Movement.DOWN;
  }

  if (y === 0) {
    return x < 0 ? Movement.LEFT : Movement.RIGHT;
  }

  if (x < 0) {
    return y < 0 ? Movement.UP_LEFT : Movement.DOWN_LEFT;
  }

  return y < 0 ? Movement.UP_RIGHT : Movement.DOWN_RIGHT;
}
