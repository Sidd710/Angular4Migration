/* ------------------------------------------------------------
 * Created By	: CodeBhagat 1.0
 * Created Date	: 9/4/2017
 * Component	: ProductsRoutingModule
 * Purpose		: Routing module for Products.
 * Copyright	: Copyright 2014-2016 CodeBhagat LLC. All Rights Reserved.
 * Restrictions	: The generated code is for evaluation purpose only. Use of this generated code requires valid softare license.
 * ------------------------------------------------------------
*/

import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsListComponent } from './ProductsList.component';
import { ProductsAddComponent }  from './ProductsAdd.component';
import { ProductsEditComponent } from './ProductsEdit.component';
import { ProductsDetailsComponent } from './ProductsDetails.component';

const ProductsRoutes: Routes = [
	{ path: 'Products',  component: ProductsListComponent },
	{ path: 'Products/add', component: ProductsAddComponent },
	{ path: 'Products/:id', component: ProductsEditComponent },
	{ path: 'Products/Details/:id', component: ProductsDetailsComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(ProductsRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class ProductsRoutingModule { }
