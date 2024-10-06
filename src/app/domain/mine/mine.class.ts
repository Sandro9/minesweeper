import { Field } from "../field/field.class";

export class Mine extends Field {
    public readonly type = 'mine';
    protected isFlagged: boolean = false;

}