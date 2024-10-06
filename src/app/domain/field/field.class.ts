import { GraphNode } from "../graph/domain/classes/graph-node";
import { Point } from "../graph/domain/classes/Point";

type FieldType = 'field' | 'mine'

export abstract class Field extends GraphNode {
    public abstract readonly type: FieldType;
    protected abstract isFlagged: boolean;
}