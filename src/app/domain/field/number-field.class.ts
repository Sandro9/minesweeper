import { Point } from "../graph/domain/classes/Point";
import { Field } from "./field.class";

export class NumberField extends Field { 
    public readonly type = 'field';
    protected isFlagged: boolean = false;
    
    constructor(
        id: string,
        position: Point,
        public readonly value: number
    ) {
        super(id, position);
    }
}