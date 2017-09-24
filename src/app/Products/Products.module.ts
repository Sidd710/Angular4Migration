/* ------------------------------------------------------------
 * Created By	: CodeBhagat 1.0
 * Created Date	: 9/4/2017
 * Component	: ProductsModule
 * Purpose		: Module for Products.
 * Copyright	: Copyright 2014-2016 CodeBhagat LLC. All Rights Reserved.
 * Restrictions	: The generated code is for evaluation purpose only. Use of this generated code requires valid softare license.
 * ------------------------------------------------------------
*/

import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { SharedModule } from '../shared/Shared.module';

import { ProductsService } from './Products.service';
import { ProductsListComponent } from './ProductsList.component';
import { ProductsSearchComponent } from './ProductsSearch.component';
import { ProductsAddComponent } from './ProductsAdd.component';
import { ProductsEditComponent } from './ProductsEdit.component';
import { ProductsDetailsComponent } from './ProductsDetails.component';

import { ProductsRoutingModule } from './Products-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
	SharedModule,
    ProductsRoutingModule
  ],
  declarations: [
    ProductsListComponent,
	ProductsSearchComponent,
    ProductsEditComponent,
    ProductsAddComponent,
	ProductsDetailsComponent
  ],
  providers: [
    ProductsService
  ]
})

export class ProductsModule { }
