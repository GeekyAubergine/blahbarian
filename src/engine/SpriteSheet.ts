import { AnimationDefinition } from "./Animation";

type SpriteDefinition = {
  sx: number;
  sy: number;
};

export class Sprite {
  readonly id: string;
  readonly sx: number;
  readonly sy: number;

  constructor(id: string, sx: number, sy: number) {
    this.id = id;
    this.sx = sx;
    this.sy = sy;
  }

  static fromDefinition(id: string, definition: SpriteDefinition): Sprite {
    return new Sprite(id, definition.sx, definition.sy);
  }
}

export type SpriteSheetDefinition = {
  sprites: Record<string, SpriteDefinition>;
  assetFileName: string;
  rotationPoint: {
    x: number;
    y: number;
  };
  spriteSize: {
    width: number;
    height: number;
  };
};

export class SpriteSheet {
  readonly sprites: Record<string, Sprite>;
  readonly assetFileName: string;
  readonly rotationPoint: {
    x: number;
    y: number;
  };

  readonly spriteSize: {
    width: number;
    height: number;
  };

  image: ImageBitmap | null = null;

  constructor(
    sprites: Record<string, Sprite>,
    assetFileName: string,
    spriteSize: { width: number; height: number },
    rotationPoint: { x: number; y: number }
  ) {
    this.sprites = sprites;
    this.assetFileName = `assets/${assetFileName}`;
    this.spriteSize = spriteSize;
    this.rotationPoint = rotationPoint;
  }

  async load() {
    const image = new Image();
    image.src = this.assetFileName;
    return new Promise<void>((resolve, reject) => {
      image.onload = () => {
        createImageBitmap(image)
          .then((imageBitmap) => {
            console.log({ imageBitmap });
            this.image = imageBitmap;
            resolve();
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      };
    });
  }

  static fromDefinition(definition: SpriteSheetDefinition): SpriteSheet {
    const sprites: Record<string, Sprite> = {};
    for (const [id, spriteDefinition] of Object.entries(definition.sprites)) {
      sprites[id] = Sprite.fromDefinition(id, spriteDefinition);
    }
    return new SpriteSheet(
      sprites,
      definition.assetFileName,
      definition.spriteSize,
      definition.rotationPoint
    );
  }
}
