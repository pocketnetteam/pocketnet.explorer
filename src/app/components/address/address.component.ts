import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/types/Address';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.less']
})
export class AddressComponent implements OnInit {
    addresshash: string;
    address: Address;

    constructor(private dataService: DataService, private activateRoute: ActivatedRoute) {
        this.addresshash = activateRoute.snapshot.params['hash'];
    }

    ngOnInit() {
        this.dataService.getAddressInfo(this.addresshash).subscribe(data => {
            this.address = data['data'];
        });
    }

}
