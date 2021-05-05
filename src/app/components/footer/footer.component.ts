import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {

    year: Number = (new Date()).getFullYear();

    constructor() { }

    ngOnInit() {
    }

}
