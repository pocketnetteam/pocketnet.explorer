import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../../services/data.service';
import { Block } from '../../types/Block';

@Component({
    selector: 'app-block',
    templateUrl: './block.component.html',
    styleUrls: ['./block.component.less'],
    providers: [DataService],
})
export class BlockComponent implements OnInit {
    blockhash: string;
    block: Block;

    constructor(private dataService: DataService, private activateRoute: ActivatedRoute) {
        this.blockhash = activateRoute.snapshot.params['hash'];
    }

    ngOnInit() {
        this.dataService.getBlock(this.blockhash).subscribe(data => {
            this.block = data['data']['result'];
        });
    }

}
