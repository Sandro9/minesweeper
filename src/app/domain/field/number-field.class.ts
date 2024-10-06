import { Point } from "../graph/domain/classes/Point";
import { Field } from "./field.class";

export class NumberField extends Field { 
    public readonly type = 'field';
    protected isFlagged: boolean = false;
    protected isRevealed: boolean = false;

    constructor(
        id: string,
        position: Point,
        public readonly value: number
    ) {
        super(id, position);
    }

    public reveal(): void {
        this.isRevealed = true;
    }

    public getIsRevealed(): boolean {
        return this.isRevealed;
    }

    public toggleFlag(): void {
        this.isFlagged =!this.isFlagged;
    }

    public override getIsFlagged(): boolean {
        return this.isFlagged
    }
}