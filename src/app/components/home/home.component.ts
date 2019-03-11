import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { BlockCompact } from 'src/app/types/Block';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
    blocks: BlockCompact[];

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.dataService.getLastBlocks(10).subscribe(data => {
            this.blocks = data['data']['result'];
        });
    }

}
