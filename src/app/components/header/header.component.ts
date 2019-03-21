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
    
    constructor(
        private dataService: DataService,
        private router: Router,
        private global: Globals
    ) {}

    get Global() : Globals {
        return this.global;
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
                if (data['statusCode'] == 200 && data['data']['result']['type'] != 'notfound') {
                    this.router.navigate([`${data['data']['result']['type']}`, value])
                }
            });
        }

        this.searchValue = '';
    }

    

}
