export interface PlaygroundDimensions {
    width: number;
    height: number;
}

export interface PlaygroundGeneratorConfig {
    dimensions: PlaygroundDimensions;
    seed ?: number;
}

export type PlaygroundBase = ('mine' | number)[][];


export type PlaygroundGenerationMeta = {
    totalMines: number;
    dimensions: PlaygroundDimensions;
    seed: number;
}