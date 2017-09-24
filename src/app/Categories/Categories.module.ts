/* ------------------------------------------------------------
 * Created By	: CodeBhagat 1.0
 * Created Date	: 9/4/2017
 * Component	: CategoriesModule
 * Purpose		: Module for Categories.
 * Copyright	: Copyright 2014-2016 CodeBhagat LLC. All Rights Reserved.
 * Restrictions	: The generated code is for evaluation purpose only. Use of this generated code requires valid softare license.
 * ------------------------------------------------------------
*/

import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { SharedModule } from '../shared/Shared.module';

import { CategoriesService } from './Categories.service';
import { CategoriesListComponent } from './CategoriesList.component';
import { CategoriesSearchComponent } from './CategoriesSearch.component';
import { CategoriesAddComponent } from './CategoriesAdd.component';
import { CategoriesEditComponent } from './CategoriesEdit.component';
import { CategoriesDetailsComponent } from './CategoriesDetails.component';

import { CategoriesRoutingModule } from './Categories-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
	SharedModule,
    CategoriesRoutingModule
  ],
  declarations: [
    CategoriesListComponent,
	CategoriesSearchComponent,
    CategoriesEditComponent,
    CategoriesAddComponent,
	CategoriesDetailsComponent
  ],
  providers: [
    CategoriesService
  ]
})

export class CategoriesModule { }
