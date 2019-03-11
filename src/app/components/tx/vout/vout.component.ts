import { Component, OnInit, Input } from '@angular/core';
import { Vout } from 'src/app/types/Transaction';

@Component({
    selector: 'app-vout',
    templateUrl: './vout.component.html',
    styleUrls: ['./vout.component.less']
})
export class VoutComponent implements OnInit {
    @Input() vout: Vout;
    @Input() extend: boolean = false;

    constructor() { }

    ngOnInit() {
    }

}
