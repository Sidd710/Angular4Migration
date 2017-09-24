/* ------------------------------------------------------------
 * Created By	: CodeBhagat 1.0
 * Created Date	: 9/4/2017
 * Component	: ProductsAddComponent
 * Purpose		: This component allows to create new Products record and save changes.
 * Dependency	: ProductsService
 * Copyright	: Copyright 2014-2016 CodeBhagat LLC. All Rights Reserved.
 * Restrictions	: The generated code is for evaluation purpose only. Use of this generated code requires valid softare license.
 * ------------------------------------------------------------
*/

import { Component, OnInit,
	HostBinding, trigger, transition, animate,
	style, state } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ToastsManager }  from 'ng2-toastr';

import { ProductsData, ProductsService } from './Products.service';
import { SuppliersData, SuppliersService } from '../Suppliers/Suppliers.service';
import { CategoriesData, CategoriesService } from '../Categories/Categories.service';


@Component({
	selector: 'my-Products-add',
	templateUrl: './ProductsAdd.component.html',
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
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
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

export class ProductsAddComponent implements OnInit {
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

	// Lookup Arrays
	
	SuppliersList: SuppliersData[];
	CategoriesList: CategoriesData[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
	private toastr: ToastsManager,
    private ProductsService: ProductsService
			, private  SuppliersService:  SuppliersService
			, private  CategoriesService:  CategoriesService

	) {
		this.objProducts = new ProductsData();
	}

	ngOnInit() {
		this.objProducts = new ProductsData();
		this.getLookups();
	}

	addProducts() {
		this.ProductsService.addProductsData(this.objProducts)
			.subscribe(record => this.router.navigate(['/Products']),
			error =>  this.errorMessage = 'There was an error while adding record. Error: ' + <any>error,
			() => { 
				this.toastr.success('Products record added successfully...', 'Add Products');
				console.log('Products record added successfully...'); 
			}
		);
	}

	gotoProducts() {
		// let Id = this.objProducts ? this.objProducts.ProductID : null;
		this.router.navigate(['/Products']);
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
