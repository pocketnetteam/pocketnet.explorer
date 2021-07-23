import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router, NavigationEnd } from '@angular/router';
import { Globals } from 'src/app/globals';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
    searchValue: string = '';
    search_full: boolean = false;
    
    constructor(
        private dataService: DataService,
        private router: Router,
        private global: Globals
    ) {}

    get Global() : Globals {
        return this.global;
    }

    get lastblock(){
        return this.Global.blockchainInfo.lastblock;
    }

    get selectedNode(){
        return this.dataService.selectedNode;
    }

    ngOnInit() {
        this.router.routeReuseStrategy.shouldReuseRoute = function(){
            return false;
        };
        
        this.router.events.subscribe((evt) => {
            if (evt instanceof NavigationEnd) {
                this.router.navigated = false;
                window.scrollTo(0, 0);
            }
        });
    }

    searchEnter(value: string) {
        if (value.length == 34 || value.length == 64) {
            // Address
            this.dataService.checkStringType(value).subscribe(data => {
                if (data && data['data'] && data['data']['type'] != 'notfound') {
                    this.router.navigate([`${data['data']['type']}`, value])
                }
            });
        }

        this.searchValue = '';
    }
    
    searchFull() {
        this.search_full = true;
    }

}
