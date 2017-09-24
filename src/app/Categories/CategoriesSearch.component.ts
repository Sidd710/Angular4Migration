/* ------------------------------------------------------------
 * Created By	: CodeBhagat 1.0
 * Created Date	: 9/4/2017
 * Component	: CategoriesSearchComponent
 * Purpose		: This component retrieves data for the specified records based on search supplied.
 * Dependency	: CategoriesService
 * Copyright	: Copyright 2014-2016 CodeBhagat LLC. All Rights Reserved.
 * Restrictions	: The generated code is for evaluation purpose only. Use of this generated code requires valid softare license.
 * ------------------------------------------------------------
*/

import { Component, OnInit, HostBinding, EventEmitter, Input, Output,
         trigger, transition, animate,
         style, state } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { CategoriesData, CategoriesService }  from './Categories.service';


@Component({
  selector: 'CategoriesSearch',
  templateUrl: './CategoriesSearch.component.html',
  providers: [CategoriesService
	
	],
  animations: [
    trigger('routeAnimation', [
      state('*',
        style({
          opacity: 1,
          transform: 'translateX(0)'
        })
      ),
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(100%)'
        }),
        animate('0.5s ease-in')
      ]),
      transition(':leave', [
        animate('0.5s ease-out', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ])
  ]
})

export class CategoriesSearchComponent implements OnInit {
	@Output() filterCriteria = new EventEmitter<string>();
	
	/* Animation for Search section */
	@HostBinding('@routeAnimation') get routeAnimation() {
		return true;
	}

	@HostBinding('style.display') get display() {
		return 'block';
	}

	// @HostBinding('style.position') get position() {
	//  return 'absolute';
	// }
 
	objCategories: CategoriesData;
	errorMessage: string;
	messages: string[];
	filterExpression: string;
	showSearch: boolean;

	// Lookup Arrays
	

	constructor(private route: ActivatedRoute, 
		private router: Router,
		private CategoriesService: CategoriesService

	) {
		// this.id = parseInt(params.get('id'));
		this.objCategories = new CategoriesData();
		/* Initialize Lookup field values
		this.objProducts.CategoryID = 0;
		this.objProducts.SupplierID = 0;
		*/
		this.filterCriteria = new EventEmitter<string>();
	}

	ngOnInit() {
		// Getting lookup data
		this.getLookups();
	}
	
	clearCriteria() {
		/* To empty values in textbox and dropdown lists
		this.objProducts.ProductName = '';
		this.objProducts.CategoryID = 0;
		this.objProducts.SupplierID = 0;
		*/
		this.objCategories = new CategoriesData();
		this.filterExpression = '';
		event.preventDefault();
		console.log(`Filter Changed: ${this.filterExpression}`);
		this.filterCriteria.emit(this.filterExpression);
	}
	
	onExpandCollapse()
	{
		this.showSearch = !this.showSearch;
	}
	
	searchProducts() {
		// Updating filterExpression on Search button click
		this.filterExpression = '';
		
		if (this.objCategories.CategoryID)
		{
			if (this.filterExpression.length > 0) {
				this.filterExpression = this.filterExpression + ' AND CategoryID = ' + this.objCategories.CategoryID;
			}
			else {
				this.filterExpression = 'CategoryID = ' + this.objCategories.CategoryID;
			}
		}
		if (this.objCategories.CategoryName)
		{
			if (this.filterExpression.length > 0) {
				this.filterExpression = this.filterExpression + ` AND CategoryName like '%${this.objCategories.CategoryName}%'`;
			}
			else {
				this.filterExpression = `CategoryName like '%${this.objCategories.CategoryName}%'`;
			}
		}
		if (this.objCategories.Description)
		{
			if (this.filterExpression.length > 0) {
				this.filterExpression = this.filterExpression + ` AND Description like '%${this.objCategories.Description}%'`;
			}
			else {
				this.filterExpression = `Description like '%${this.objCategories.Description}%'`;
			}
		}

		
		/* Build Search here
		if (this.objProducts.ProductName)
		{
			this.filterExpression += "ProductName like '%" + this.objProducts.ProductName + "%'";
		}
		if (this.objProducts.CategoryID  && this.objProducts.CategoryID.toString() != "0")
		{
			if (this.filterExpression.length > 0)
				this.filterExpression = this.filterExpression + " AND CategoryID = " + this.objProducts.CategoryID;
			else
				this.filterExpression = "CategoryID = " + this.objProducts.CategoryID;
		}
		if (this.objProducts.SupplierID && this.objProducts.SupplierID.toString() != "0")
		{
			if (this.filterExpression.length > 0)
				this.filterExpression = this.filterExpression + " AND SupplierID = " + this.objProducts.SupplierID;
			else
				this.filterExpression = "SupplierID = " + this.objProducts.SupplierID;
		}
		*/
		event.preventDefault();
    	console.log(`Filter Changed: ${this.filterExpression}`);
		this.filterCriteria.emit(this.filterExpression);
	}



	getLookups() {

	}

	log(msg: string) {
		this.messages.splice(0, 0, msg);
		console.log(msg);
	}
}
