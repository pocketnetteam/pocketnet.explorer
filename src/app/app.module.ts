import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './components/app/app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { BlockComponent } from './components/block/block.component';
import { HomeComponent } from './components/home/home.component';

import { HexService } from './services/hex.service';
import { DataService } from './services/data.service';
import { TransactionComponent } from './components/transaction/transaction.component';
import { TxListComponent } from './components/tx-list/tx-list.component';
import { TxComponent } from './components/tx/tx.component';
import { AddressComponent } from './components/address/address.component';
import { VoutComponent } from './components/tx/vout/vout.component';
import { VinComponent } from './components/tx/vin/vin.component';
import { PocPipe } from './pipes/poc.pipe';
import { BlockListComponent } from './components/block-list/block-list.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        BlockComponent,
        HomeComponent,
        LoaderComponent,
        TransactionComponent,
        TxListComponent,
        TxComponent,
        AddressComponent,
        VoutComponent,
        VinComponent,
        PocPipe,
        BlockListComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
