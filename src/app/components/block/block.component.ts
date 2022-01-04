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
    blocknumber: number;
    block: Block;
    notFound: Boolean = false;

    isNumber(value: string | number): boolean
    {
        return ((value != null) &&
            (value !== '') &&
            !isNaN(Number(value.toString())));
    }

    constructor(private dataService: DataService, private activateRoute: ActivatedRoute)
    {
        this.blockhash = activateRoute.snapshot.params['hash'];
    }

    ngOnInit() {
        var hash = !this.isNumber(this.blockhash) ? this.blockhash : '';
        var number = this.isNumber(this.blockhash) ? Number(this.blockhash)  : -1;
        
        this.dataService.getCompactBlock(hash, number,
            data => {
                this.block = data
                this.notFound = false;
            },
            err => {
                this.notFound = true;
            }
        );
    }

}
