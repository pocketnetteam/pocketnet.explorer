import { Component, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service';
import { TopAddress } from 'src/app/types/TopAddress';

@Component({
    selector: 'app-topaddresses',
    templateUrl: './topaddresses.component.html',
    styleUrls: ['./topaddresses.component.less'],
    providers: [DataService],
})
export class AddressesComponent implements OnInit {
    addresses: TopAddress[]

    constructor(private dataService: DataService) {
    }

    ngOnInit() {
        this.dataService.getTopAddresses().subscribe((data: TopAddress[]) => {
            this.addresses = data;
        });
    }

}
