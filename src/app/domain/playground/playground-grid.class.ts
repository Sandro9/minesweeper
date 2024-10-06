import { NumberField } from "../field/number-field.class";
import { Graph } from "../graph/domain/classes/graph";
import { Point } from "../graph/domain/classes/Point";
import { Mine } from "../mine/mine.class";
import { PlaygroundBase } from "./domain/models/playground.model";

export class PlaygroundGrid<T extends (Mine | NumberField) = (Mine | NumberField)> {
    private readonly _graph: Graph<T>;
    constructor(
        private readonly _playgroundBase: PlaygroundBase
    ){
        this._graph = new Graph<T>();
        this.fillAndConnectGraph(this._graph, _playgroundBase);
    }

    private fillAndConnectGraph(graph: Graph, playgroundBase: PlaygroundBase) {
        for (let y = 0; y < playgroundBase.length; y++) {
            for (let x = 0; x < playgroundBase[y].length; x++) {
                const cell = playgroundBase[y][x];
                const point = new Point(x, y);
                const id = `${x}-${y}`;
                if (cell === 'mine') {
                    graph.tryAddNode(new Mine(id, point));
                } else {
                    graph.tryAddNode(new NumberField(id, point, cell));
                }
                this.connectNeighbours(graph, point);
            }
        }
    }

    private connectNeighbours(graph: Graph, point: Point) {
        const currentNode = graph.getNodeByPoint(point);
        const neighbourNodeIds = [
            `${point.x}-${point.y - 1}`,
            `${point.x}-${point.y + 1}`,
            `${point.x - 1}-${point.y}`,
            `${point.x + 1}-${point.y}`,
            `${point.x - 1}-${point.y - 1}`,
            `${point.x - 1}-${point.y + 1}`,
            `${point.x + 1}-${point.y - 1}`,
            `${point.x + 1}-${point.y + 1}`,
        ]
        if (currentNode) {
            neighbourNodeIds.forEach(neighbourId => {
                const neighbour = graph.getNodeById(neighbourId);
                if(neighbour) {
                    graph.tryAddConnection(currentNode, neighbour)
                }
            });
        }
    }

    public getGraph(): Graph {
        return this._graph;
    }

    public getPlaygroundBase(): PlaygroundBase {
        return this._playgroundBase;
    }
}