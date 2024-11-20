import { BehaviorSubject } from "rxjs";
import { PlaygroundGrid } from "../playground-grid.class";
import { PlaygroundGenerationMeta } from "./models/playground.model";

export class Playground {
    constructor(
        public readonly meta: PlaygroundGenerationMeta,
        public readonly grid: PlaygroundGrid
    ){}

    public readonly flagModeActive$ = new BehaviorSubject(false);
    public readonly hasWon = new BehaviorSubject(false);
    public readonly hasLost = new BehaviorSubject(false);


    public fieldInteraction(index: string): void {
        if(this.flagModeActive$.value) {
            this.flagField(index);
        } else {
            this.unrevealField(index);
        }
    }

    public unrevealField(index: string): void {
        const node = this.grid.getGraph()?.getNodeById(index);
        if(!node) throw new Error(`No node found for index ${index}`);
        node.reveal();
        
        if(node.type === 'mine') {
            this.hasLost.next(true);
            return;
        }
        if(node.value === 0) {
            node.connections.forEach(connection => {
                const connectionNode = this.grid.getGraph().getNodeById(connection.target.id);
                if(connectionNode && !connectionNode.getIsRevealed() && connectionNode.type !== 'mine')
                this.unrevealField(connection.target_id)
            });
        }
    }

    public flagField(index: string): void {
        const node = this.grid.getGraph()?.getNodeById(index);
        const flagsCount = this.grid.getGraph()?.nodes.filter(node => node.getIsFlagged()).length;
        if(flagsCount > this.meta.totalMines) throw new Error('Cannot flag more nodes as there are mines');
        if(!node) throw new Error(`No node found for index ${index}`);
        node.toggleFlag();
        if(this.checkWinCondition()) {
            this.hasWon.next(true);
            return;
        }
    }

    public toggleFlagMode(): void {
        this.flagModeActive$.next(!this.flagModeActive$.value);
    }

    private checkWinCondition(): boolean {
        const flaggedMinesCount = this.grid.getGraph()?.nodes.filter(node => node.getIsFlagged() && node.type ==='mine').length;
        return flaggedMinesCount === this.meta.totalMines;
    }
}