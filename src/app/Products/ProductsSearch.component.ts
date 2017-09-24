/* ------------------------------------------------------------
 * Created By	: CodeBhagat 1.0
 * Created Date	: 9/4/2017
 * Component	: ProductsSearchComponent
 * Purpose		: This component retrieves data for the specified records based on search supplied.
 * Dependency	: ProductsService
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

import { ProductsData, ProductsService }  from './Products.service';
import { SuppliersData, SuppliersService } from '../Suppliers/Suppliers.service';
import { CategoriesData, CategoriesService } from '../Categories/Categories.service';


@Component({
  selector: 'ProductsSearch',
  templateUrl: './ProductsSearch.component.html',
  providers: [ProductsService
	, SuppliersService, CategoriesService
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

export class ProductsSearchComponent implements OnInit {
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
 
	objProducts: ProductsData;
	errorMessage: string;
	messages: string[];
	filterExpression: string;
	showSearch: boolean;

	// Lookup Arrays
	
	SuppliersList: SuppliersData[];
	CategoriesList: CategoriesData[];

	constructor(private route: ActivatedRoute, 
		private router: Router,
		private ProductsService: ProductsService
			, private  SuppliersService:  SuppliersService
			, private  CategoriesService:  CategoriesService

	) {
		// this.id = parseInt(params.get('id'));
		this.objProducts = new ProductsData();
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
		this.objProducts = new ProductsData();
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
		
		if (this.objProducts.ProductID)
		{
			if (this.filterExpression.length > 0) {
				this.filterExpression = this.filterExpression + ' AND ProductID = ' + this.objProducts.ProductID;
			}
			else {
				this.filterExpression = 'ProductID = ' + this.objProducts.ProductID;
			}
		}
		if (this.objProducts.ProductName)
		{
			if (this.filterExpression.length > 0) {
				this.filterExpression = this.filterExpression + ` AND ProductName like '%${this.objProducts.ProductName}%'`;
			}
			else {
				this.filterExpression = `ProductName like '%${this.objProducts.ProductName}%'`;
			}
		}
		if (this.objProducts.SupplierID)
		{
			if (this.filterExpression.length > 0) {
				this.filterExpression = this.filterExpression + ' AND SupplierID = ' + this.objProducts.SupplierID;
			}
			else {
				this.filterExpression = 'SupplierID = ' + this.objProducts.SupplierID;
			}
		}
		if (this.objProducts.CategoryID)
		{
			if (this.filterExpression.length > 0) {
				this.filterExpression = this.filterExpression + ' AND CategoryID = ' + this.objProducts.CategoryID;
			}
			else {
				this.filterExpression = 'CategoryID = ' + this.objProducts.CategoryID;
			}
		}
		if (this.objProducts.QuantityPerUnit)
		{
			if (this.filterExpression.length > 0) {
				this.filterExpression = this.filterExpression + ` AND QuantityPerUnit like '%${this.objProducts.QuantityPerUnit}%'`;
			}
			else {
				this.filterExpression = `QuantityPerUnit like '%${this.objProducts.QuantityPerUnit}%'`;
			}
		}
		if (this.objProducts.UnitPrice)
		{
			if (this.filterExpression.length > 0) {
				this.filterExpression = this.filterExpression + ' AND UnitPrice = ' + this.objProducts.UnitPrice;
			}
			else {
				this.filterExpression = 'UnitPrice = ' + this.objProducts.UnitPrice;
			}
		}
		if (this.objProducts.UnitsInStock)
		{
			if (this.filterExpression.length > 0) {
				this.filterExpression = this.filterExpression + ' AND UnitsInStock = ' + this.objProducts.UnitsInStock;
			}
			else {
				this.filterExpression = 'UnitsInStock = ' + this.objProducts.UnitsInStock;
			}
		}
		if (this.objProducts.UnitsOnOrder)
		{
			if (this.filterExpression.length > 0) {
				this.filterExpression = this.filterExpression + ' AND UnitsOnOrder = ' + this.objProducts.UnitsOnOrder;
			}
			else {
				this.filterExpression = 'UnitsOnOrder = ' + this.objProducts.UnitsOnOrder;
			}
		}
		if (this.objProducts.ReorderLevel)
		{
			if (this.filterExpression.length > 0) {
				this.filterExpression = this.filterExpression + ' AND ReorderLevel = ' + this.objProducts.ReorderLevel;
			}
			else {
				this.filterExpression = 'ReorderLevel = ' + this.objProducts.ReorderLevel;
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


	// Get Lookup List for Suppliers
    getSuppliers() {
		this.SuppliersService.getAll().subscribe(records => this.SuppliersList=records);
    }
	// Get Lookup List for Categories
    getCategories() {
		this.CategoriesService.getAll().subscribe(records => this.CategoriesList=records);
    }

	getLookups() {

        this.getSuppliers();
        this.getCategories();
	}

	log(msg: string) {
		this.messages.splice(0, 0, msg);
		console.log(msg);
	}
}
