import { PlaygroundGrid } from "../playground-grid.class";
import { PlaygroundGenerationMeta } from "./models/playground.model";

export class Playground {
    constructor(
        public readonly meta: PlaygroundGenerationMeta,
        public readonly grid: PlaygroundGrid
    ){}
}