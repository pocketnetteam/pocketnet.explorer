import { Component, Input, OnInit } from '@angular/core';
import { Globals } from 'src/app/globals';
import { Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.less']
})
export class ModalComponent implements OnInit {

    @Input() txtSuccess = 'Success';
    @Input() txtClose = 'Close';

    constructor(
        private global: Globals
       
    ) { }

    @Output() closeModal = new EventEmitter<string>();
    @Output() successModal = new EventEmitter<string>();

    close() {
      this.closeModal.emit();
    }

    success() {
        this.successModal.emit();
    }

    get Global() : Globals {
        return this.global;
    }

    ngOnInit() {
    }

}
