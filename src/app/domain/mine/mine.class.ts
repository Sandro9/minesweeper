import { Field } from "../field/field.class";

export class Mine extends Field {
    public readonly type = 'mine';
    protected isFlagged: boolean = false;
    protected isRevealed: boolean = false;

    public reveal(): void {
        this.isRevealed = true;
        console.error('BOOOOM');
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