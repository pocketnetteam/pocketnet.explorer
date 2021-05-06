import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlockComponent } from './components//block/block.component';
import { HomeComponent } from './components/home/home.component';
import { AddressComponent } from './components/address/address.component';
import { AddressesComponent } from './components/topaddresses/topaddresses.component';
import { TransactionComponent } from './components/transaction/transaction.component';

const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'block/:hash', component: BlockComponent},
    { path: 'address/:hash', component: AddressComponent},
    { path: 'topaddresses', component: AddressesComponent},
    { path: 'transaction/:hash', component: TransactionComponent},
    { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
