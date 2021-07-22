import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BlockCompact } from 'src/app/types/Block';

@Component({
    selector: 'app-block-list',
    templateUrl: './block-list.component.html',
    styleUrls: ['./block-list.component.less']
})
export class BlockListComponent implements OnInit {
    @Input() blocks: BlockCompact[];
    @Input() loading: boolean = false;
    @Output() moveBlocksEvent = new EventEmitter<number>();

    constructor() {
    }

    ngOnInit() {
        console.log('this.blocks', this.blocks);
    }

    MoveBlocks(diff: number = 0) {
        this.moveBlocksEvent.next(diff);
        console.log('this.blocks', this.blocks);

    }

}
