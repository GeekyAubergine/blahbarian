export class Keyboard {
  private pressedKeys: Record<string, boolean> = {};
  private keysPressedThisFrame: Record<string, boolean> = {};

  constructor() {
    window.addEventListener("keydown", this.onKeyDown.bind(this));
    window.addEventListener("keyup", this.onKeyUp.bind(this));
  }

  update() {
    this.keysPressedThisFrame = { ...this.pressedKeys };
  }

  isKeyDown(key: string) {
    return this.keysPressedThisFrame[key];
  }

  onKeyDown(event: KeyboardEvent) {
    this.pressedKeys[event.key] = true;
    this.keysPressedThisFrame[event.key] = true;
  }

  onKeyUp(event: KeyboardEvent) {
    this.pressedKeys[event.key] = false;
  }
}
