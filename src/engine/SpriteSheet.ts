type SpriteConfig = {
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

  static fromConfig(id: string, definition: SpriteConfig): Sprite {
    return new Sprite(id, definition.sx, definition.sy);
  }
}

export type SpriteSheetConfig = {
  sprites: Record<string, SpriteConfig>;
  assetFileName: string;
  rotationPoint: {
    x: number;
    y: number;
  };
  spriteSize: {
    width: number;
    height: number;
  };
  renderedSize?: {
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

  readonly renderedSize: {
    width: number;
    height: number;
  } | null;

  image: ImageBitmap | null = null;

  constructor(
    sprites: Record<string, Sprite>,
    assetFileName: string,
    spriteSize: { width: number; height: number },
    renderedSize: { width: number; height: number } | null,
    rotationPoint: { x: number; y: number }
  ) {
    this.sprites = sprites;
    this.assetFileName = `assets/${assetFileName}`;
    this.spriteSize = spriteSize;
    this.renderedSize = renderedSize;
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

  static fromConfig(definition: SpriteSheetConfig): SpriteSheet {
    const sprites: Record<string, Sprite> = {};
    for (const [id, spriteDefinition] of Object.entries(definition.sprites)) {
      sprites[id] = Sprite.fromConfig(id, spriteDefinition);
    }
    return new SpriteSheet(
      sprites,
      definition.assetFileName,
      definition.spriteSize,
      definition.renderedSize ?? null,
      definition.rotationPoint
    );
  }
}
