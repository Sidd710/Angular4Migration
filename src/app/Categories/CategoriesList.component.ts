/* ------------------------------------------------------------
 * Created By	: CodeBhagat 1.0
 * Created Date	: 9/4/2017
 * Component	: CategoriesListComponent
 * Purpose		: This component retrieve paged data and performs paging operations
 * Dependency	: CategoriesService
 * Copyright	: Copyright 2014-2016 CodeBhagat LLC. All Rights Reserved.
 * Restrictions	: The generated code is for evaluation purpose only. Use of this generated code requires valid softare license.
 * ------------------------------------------------------------
*/

import { Component, HostBinding, EventEmitter, Input, Output, OnInit, ViewChild,
	trigger, transition, animate,
	style, state } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastsManager }  from 'ng2-toastr';

import myGlobals = require('../globals');
import { CategoriesData, CategoriesService } from './Categories.service';
import { CategoriesSearchComponent }  from './CategoriesSearch.component';

@Component({
	selector: 'my-Categories',
	templateUrl: './CategoriesList.component.html',
	providers: [CategoriesService],
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
          transform: 'translateX(-100%)'
        }),
        animate('0.4s ease-in')
      ]),
      transition(':leave', [
        animate('0.7s ease-out', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ])
  ]
})

export class CategoriesListComponent implements OnInit {
	@HostBinding('@routeAnimation') get routeAnimation() {
		return true;
	}

	@HostBinding('style.display') get display() {
		return 'block';
	}
	
	CategoriesList: CategoriesData[];
	newCategories: CategoriesData;
	selectedCategories: CategoriesData;
	errorMessage: string;
	messages: string[];
	showAdd: boolean;
	@ViewChild(CategoriesSearchComponent) filterComponent: CategoriesSearchComponent;

	sortExpression: string = "CategoryID";
	filterExpression: string = "";
	pageIndex: number = 1;
	pageSize: number = 10;
	endRowIndex: number;
	rowsCount: number;
	pageCount: number;
	isFirstPage: boolean;
	isLoading: boolean;

    private selectedId: string;

	constructor(
		private CategoriesService: CategoriesService,
		private route: ActivatedRoute,
		private router: Router,
		private toastr: ToastsManager
	) {
		this.newCategories = new CategoriesData();
		this.pageSize = myGlobals.pageSize;
	}

	ngOnInit() {
		//this.CategoriesService.getAll().subscribe(record => this.CategoriesList=record);
		this.pageIndex = 1;
		this.isFirstPage = true;
		this.getCategoriesByPaging();

		/*
		this.CategoriesList = this.route.params
			.switchMap((params: Params) => {
				this.selectedId = +params['id'];
				return this.service.getAll();
			});
		*/
	}

	// Get all records
	public getCategories() {
		this.CategoriesService.getAll()
			.subscribe(data => this.CategoriesList = data,
		error =>  this.errorMessage = 'There was an error while retrieving records. Error: ' + <any>error);
	}
	
	// On Search CLick on CategoriesSearch Component
	onSearch(searchText: string) {
		// 1. Update this.filterExpression
		this.filterExpression = searchText;

		// 2. call getCategoriesByPaging method that will refresh the data
		this.pageIndex = 1;
		this.getCategoriesByPaging();
	}
	
	onSort(event, sortColumn: string)
	{
		// var target = event.target || event.srcElement || event.currentTarget;
		// var parent = target.parentNode;
		if (this.sortExpression === sortColumn)
			this.sortExpression = sortColumn + ' desc';
		else if (this.sortExpression === sortColumn + ' desc')
			this.sortExpression = sortColumn;
		else
			this.sortExpression = sortColumn;
		this.getCategoriesByPaging();
	}
	
	// Get records by paging
	getCategoriesByPaging() {
		this.isLoading = true;
		this.CategoriesService.getAllByPaging(this.filterExpression, this.sortExpression, this.pageIndex, this.pageSize)
			.subscribe(data => {
				this.CategoriesList=data.CategoriesList;
				this.rowsCount=data.RowsCount;
				this.pageCount= Math.ceil(this.rowsCount / this.pageSize);
				if (this.pageIndex == 1)
					this.isFirstPage = true;
				else
					this.isFirstPage = false;
				if (this.pageIndex == this.pageCount)
					this.endRowIndex = this.rowsCount;
				else
					this.endRowIndex = this.pageIndex * this.pageSize;
				this.isLoading = false;
			},
			error =>  {
				this.errorMessage = 'There was an error while retrieving records. Error: ' + <any>error;
				this.isLoading = false;
			}
		);
	}

	// Adds new record
	addCategories() {
		this.CategoriesService.addCategoriesData(this.newCategories).subscribe(record => console.log(record));
		this.getCategories();
	}

	// Updates existing record
	updateCategories() {
		this.CategoriesService.updateCategoriesData(this.selectedCategories).subscribe(record => console.log(record));
		this.getCategories();
	}

	// Deletes record with specified id
	deleteCategories(id: string) {
		if (window.confirm('Are you sure you want to delete this Categories?') == true)
		{
			this.CategoriesService.deleteCategories(id)
			.subscribe(data => this.getCategories(),
			error =>  this.errorMessage = 'There was an error while deleting record. Error: ' + <any>error,
				() => { 
					this.toastr.success('Categories record deleted successfully...', 'Delete Categories');
					console.log('Categories record deleted successfully...'); 
				}
			);
		}
	}

	// Go to First Page
	onFirstPage() {
		this.pageIndex = 1;
		this.getCategoriesByPaging();
	}

	// Go to Previous Page
	onPreviousPage() {
		if (this.pageIndex > 1) {
			this.pageIndex = this.pageIndex - 1;
			this.getCategoriesByPaging();
		}
	}

	// Refresh - Go to First Page
	onRefresh() {
		this.onFirstPage();
	}

	// Go to Next Page
	onNextPage() {
		if (this.pageIndex < this.pageCount) {
			this.pageIndex = this.pageIndex + 1;
			this.getCategoriesByPaging();
		}
	}

	// Go to Last Page
	onLastPage() {
		this.pageIndex = this.pageCount;
		this.getCategoriesByPaging();
	}

	// On Edit - Go to Edit page
	onSelect(item: CategoriesData) {
		this.router.navigate(['/Categories', item.CategoryID]);
	}

	// On Details - Go to Details page
	onSelectDetails(item: CategoriesData) {
		this.router.navigate(['/Categories/Details', item.CategoryID]);
	}

	// Set record as selected
	SelectCategories(item: CategoriesData) {
		this.selectedCategories = item;
	}

	// Submits form
	submitForm(data: Object) {
		console.log(data);
	}

	// Logs message onto Console
	log(msg: string) {
		this.messages.splice(0, 0, msg);
		console.log(msg);
	}
}
