import { Component, OnInit, Input } from '@angular/core';
import { Vin } from 'src/app/types/Transaction';

@Component({
    selector: 'app-vin',
    templateUrl: './vin.component.html',
    styleUrls: ['./vin.component.less']
})
export class VinComponent implements OnInit {
    @Input() vin: Vin;
    @Input() extend: boolean = false;
    
    constructor() { }

    ngOnInit() {
    }

}
