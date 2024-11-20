import { SeedRandom } from "../../seed/domain/seed.random";
import { PlaygroundGrid } from "../playground-grid.class";
import { PlaygroundBase, PlaygroundGeneratorConfig } from "./models/playground.model";
import { Playground } from "./playground";


export class PlaygroundGenerator {

    public constructor(
        private readonly _seedGenerator: SeedRandom
    ){}

    public generatePlayground(config: PlaygroundGeneratorConfig): Playground {
        const {width, height} = config.dimensions;
        const seed = config.seed ?? 1;
        const base = this.generateBase(width, height);
        const filledPlaceholder = this.fillBaseNeighbours(base);
        return new Playground(
            {
                dimensions: config.dimensions,
                seed: this._seedGenerator.getSeed(),
                totalMines: this.countMines(base)
            },
            new PlaygroundGrid(base)
        )
    }

    private generateBase(width: number, height: number): PlaygroundBase {
        const placeholder: PlaygroundBase = []
        for (let y = 0; y < height; y++) {
            if(placeholder[y] === undefined) placeholder[y] = [];
            for (let x = 0; x < width; x++) {
                placeholder[y][x] = this._seedGenerator.random() < 0.1? 'mine' : 0;
            }
        }
        return placeholder;
    }

    private fillBaseNeighbours(placeholder: PlaygroundBase) {
        for (let y = 0; y < placeholder.length; y++) {
            for (let x = 0; x < placeholder[y].length; x++) {
                if(placeholder[y][x] === 0) {
                    let mineCount = 0;
                    for(let dy = -1; dy <= 1; dy++) {
                        for(let dx = -1; dx <= 1; dx++) {
                            if(dy === 0 && dx === 0) continue;
                            const nx = x + dx;
                            const ny = y + dy;
                            if(nx >= 0 && nx < placeholder[y].length && ny >= 0 && ny < placeholder.length) {
                                mineCount += placeholder[ny][nx] ==='mine'? 1 : 0;
                            }
                        }
                    }
                    placeholder[y][x] = mineCount;
                }
            }
        }
        return placeholder;
    }

    private countMines(base: PlaygroundBase): number {
        return base.reduce((count, row) => count + row.filter(cell => cell ==='mine').length, 0);
    }
}