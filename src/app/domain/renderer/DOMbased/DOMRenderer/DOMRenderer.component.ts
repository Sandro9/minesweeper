import { ChangeDetectionStrategy, Component, computed, effect, input, type OnInit } from '@angular/core';
import { Playground } from '../../../playground/domain/playground';
import { RangePipe } from '../../../range/range.pipe';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-domrenderer',
  standalone: true,
  imports: [
    RangePipe,
    NgClass
  ],
  templateUrl: './DOMRenderer.component.html',
  styleUrl: './DOMRenderer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DOMRendererComponent {
  public playground = input.required<Playground>()
  
  public readonly width = computed(() => {
    return this.playground()?.meta.dimensions.width ?? 0
  })

  public readonly height = computed(() => {
    return this.playground()?.meta.dimensions.height ?? 0
  })

  public readonly graph = computed(() => {
    return this.playground()?.grid.getGraph()
  })

  public getNodeInformation(index: string) {
    const node = this.graph()?.getNodeById(index);
    if(!node) return null;
    return {
      type: node.type,
      isRevealed: node.getIsRevealed(),
      isFlagged: node.getIsFlagged(),
      value: node.type === 'field' ? node.value : 0,
      isMine: node.type ==='mine',
    }
  }

  public getStatusColor(index: string) {
    const unrevealedColor = 'bg-slate-500';
    const mineColor = 'bg-red-500';
    const node = this.graph()?.getNodeById(index);
    if(!node) return unrevealedColor;
    const isRevealed = node.getIsRevealed();
    if(!isRevealed) {
      return unrevealedColor
    }
    const isMine = node.type === 'mine';
    if(isMine) {
      return mineColor
    }
    const nodeValue = node.value;
    if(nodeValue === 1) {
      return ['text-orange-300', 'bg-orange-600'];
    } else if(nodeValue === 2) {
      return ['text-yellow-300', 'bg-yellow-600'];
    } else if(nodeValue === 3) {
      return ['text-blue-300', 'bg-blue-600'];
    } else if(nodeValue >= 4) {
      return ['text-fuchsia-300', 'bg-fuchsia-600'];
    }
    return 'bg-slate-700';
  }

  public fieldInteraction(index: string) {
    this.playground()?.fieldInteraction(index);
  }
}
