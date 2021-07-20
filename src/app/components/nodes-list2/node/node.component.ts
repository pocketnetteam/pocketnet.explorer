import { Component, OnInit, Input } from '@angular/core';
import { PeerInfo } from 'src/app/types/PeerInfo';

@Component({
    selector: 'app-node',
    templateUrl: './node.component.html',
    styleUrls: ['./node.component.less']
})
export class NodeComponent implements OnInit {
    @Input() peer: PeerInfo;

    constructor() { }

    ngOnInit() {
    }

}
