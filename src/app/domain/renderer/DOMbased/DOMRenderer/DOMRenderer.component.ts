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
    return 'bg-slate-300';
  }

  public fieldInteraction(index: string) {
    this.playground()?.fieldInteraction(index);
  }
}
