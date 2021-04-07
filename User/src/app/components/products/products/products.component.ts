import { Component, OnInit } from '@angular/core';
import { Product } from "./../../../models/Product";
import { APIResponse } from './../../../models/Api-response';
import { UserService } from './../../../services/user.service';
import { ApiService } from './../../../services/api.service';
import { FavouriteService } from 'src/app/services/favourite.service';
import { CartService } from 'src/app/services/cart.service';
import { User } from 'src/app/models/user';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  cartfake: any;
  favouritefake: any;

  constructor(private _apiService: ApiService, private _cartService: CartService, private _userService: UserService, private _favouriteService: FavouriteService) { }
  products: Product[] = [];
  userId: any;
  filterArray: any[] = [];
  filter: any[] = [];
  medicineArray: any[] = [];
  cosmiticsProductsArray: any[] = [];
  HairProductsArray: any[] = [];
  BabyProductsArray: any[] = [];
  priceArray: any[] = [];
  temporary: any[] = []
  paginate: any[] = [];
  currentPage: any[] = [];

  badgeNumber: number = 0
  user: User
  cart: any[] = []
  allstatus: boolean = false;
  medicinestatus: boolean = false;
  cosmitcsstatus: boolean = false;
  hairstatus: boolean = false;
  babystatus: boolean = false;
  addedToCart: any[] = []

  ngOnInit(): void {
    //---- Get User
    let token = this._userService.getToken()
    // console.log("Token is:", token)
    this._apiService.get('user/get/' + token).subscribe((response) => {
      let obj = response as APIResponse
      // console.log("User retreived in product component", obj)
      this.user = obj.Data
      this.userId = obj.Data["id"]
    })

    // ---- Get Products
    this._apiService.get("product").subscribe((response) => {
      let obj = response as APIResponse;
      // console.log("Product retreived is:", obj);
      if (obj.status) {
        let productData = obj.Data
        this.products = productData

        // this.filterArray = this.products;
        // this.filter = this.products;

        let length = this.products.length
        let pagesNumber = length / 9
        let pageIterator = 0
        let pageCodition = 9
        // pagination of 10 pages each
        for (let i = 0; i < pagesNumber; i++) {
          this.filterArray[i] = new Array()
          for (let j = pageIterator; j < pageCodition && j < length; j++) {
            this.filterArray[i].push(this.products[j])
          }
          pageIterator += 9
          pageCodition += 9
        }
        this.currentPage = this.filterArray[0]

      }
      else {
        alert(obj.message)
      }
    })


    //get added to cart products 
    interval(2000).pipe(
      startWith(0),
      switchMap(() => this._cartService.getAddToCartProducts())
    ).subscribe((response) => {
      let obj = response as APIResponse;
      if (obj.status) {
        this.addedToCart = obj.Data
        // console.log("this.addedToCart",this.addedToCart);
      }
      else {
        console.log(obj.message)
      }
    })


  }



  addToCart(id: any) {
    this._cartService.addToCart(id);
    this.badgeNumber++
  }

  disabled(id: any): any {
    let status: boolean = true
    for(let item of this.addedToCart){
      if(item._id == id){
        status = item.status
      } 
    }
    return status
  }

  addToFavourite(id: any) {
    this._favouriteService.addToFavourite(id);
  }


  //---- Filter Begins

  //---- Medicine
  filterMedicine(checked: boolean) {
    this.temporary = [];
    let j = 0;
    if (this.allstatus == false) {
      if (checked) {
        this.filterArray = [];
        this.medicinestatus = true;
        for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].category === "medicine" || this.products[i].category === "Medicine") {

            this.medicineArray[j] = this.products[i];
            console.log("product[i]", this.products[i]);
            j++
          }
        }
        // this.filter=this.medicineArray
        j = 0;
        if (this.filter.length == this.products.length) {
          this.filter = [];
        }

        let filterLength = this.filter.length;
        for (let k = 0; k < this.medicineArray.length; k++) {
          this.filter[filterLength] = this.medicineArray[k];
          filterLength++
        }

        this.medicineArray = [];
        console.log("this.medicineArray[i]", this.filter);

        let length = this.filter.length
        let pagesNumber = length / 9
        let pageIterator = 0
        let pageCodition = 9
        // pagination of 10 pages each
        for (let i = 0; i < pagesNumber; i++) {
          this.filterArray[i] = new Array()
          for (let j = pageIterator; j < pageCodition && j < length; j++) {
            this.filterArray[i].push(this.filter[j])
          }
          pageIterator += 9
          pageCodition += 9
        }
        this.currentPage = this.filterArray[0]
      }

      else {
        this.filterArray = [];
        this.medicinestatus = false;
        let x = 0
        for (let i = 0; i < this.filter.length; i++) {
          if (this.filter[i].category !== "medicine" && this.filter[i].category !== "Medicine") {
            this.temporary[x] = this.filter[i]
            x++
          }
        }
        this.filter = this.temporary

        let length = this.filter.length
        let pagesNumber = length / 9
        let pageIterator = 0
        let pageCodition = 9
        // pagination of 10 pages each
        for (let i = 0; i < pagesNumber; i++) {
          this.filterArray[i] = new Array()
          for (let j = pageIterator; j < pageCodition && j < length; j++) {
            this.filterArray[i].push(this.filter[j])
          }
          pageIterator += 9
          pageCodition += 9
        }
        this.currentPage = this.filterArray[0]
      }
    }


    if (this.filter.length == 0) {
      this.filterArray = [];
      this.filter = this.products

      let length = this.filter.length
      let pagesNumber = length / 9
      let pageIterator = 0
      let pageCodition = 9
      // pagination of 10 pages each
      for (let i = 0; i < pagesNumber; i++) {
        this.filterArray[i] = new Array()
        for (let j = pageIterator; j < pageCodition && j < length; j++) {
          this.filterArray[i].push(this.filter[j])
        }
        pageIterator += 9
        pageCodition += 9
      }
      this.currentPage = this.filterArray[0]
    }

  }


  //---- cosmitics Product
  filtercosmiticsProduct(checked: boolean) {
    this.temporary = [];
    let x = 0;
    if (this.allstatus == false) {
      if (checked) {
        this.filterArray = [];
        this.cosmitcsstatus = true;
        for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].category === "Cosmatics") {

            this.cosmiticsProductsArray[x] = this.products[i];
            console.log("product[i]", this.products[i]);
            x++
          }
        }
        // this.filterArray=this.cosmiticsProductsArray
        x = 0;
        if (this.filter.length == this.products.length) {
          this.filter = [];
        }

        let filterLength = this.filter.length;
        for (let k = 0; k < this.cosmiticsProductsArray.length; k++) {
          this.filter[filterLength] = this.cosmiticsProductsArray[k];
          filterLength++
        }

        this.cosmiticsProductsArray = []
        console.log("this.cosmiticsProductsArray[i]", this.filter);

        let length = this.filter.length
        let pagesNumber = length / 9
        let pageIterator = 0
        let pageCodition = 9
        // pagination of 10 pages each
        for (let i = 0; i < pagesNumber; i++) {
          this.filterArray[i] = new Array()
          for (let j = pageIterator; j < pageCodition && j < length; j++) {
            this.filterArray[i].push(this.filter[j])
          }
          pageIterator += 9
          pageCodition += 9
        }
        this.currentPage = this.filterArray[0]
      }

      else {
        this.filterArray = [];
        this.cosmitcsstatus = false;
        let x = 0
        for (let i = 0; i < this.filter.length; i++) {
          if (this.filter[i].category !== "Cosmatics") {
            this.temporary[x] = this.filter[i]
            x++
          }
        }
        this.filter = this.temporary

        let length = this.filter.length
        let pagesNumber = length / 9
        let pageIterator = 0
        let pageCodition = 9
        // pagination of 10 pages each
        for (let i = 0; i < pagesNumber; i++) {
          this.filterArray[i] = new Array()
          for (let j = pageIterator; j < pageCodition && j < length; j++) {
            this.filterArray[i].push(this.filter[j])
          }
          pageIterator += 9
          pageCodition += 9
        }
        this.currentPage = this.filterArray[0]
      }
    }


    if (this.filter.length == 0) {
      this.filterArray = [];
      this.filter = this.products

      let length = this.filter.length
      let pagesNumber = length / 9
      let pageIterator = 0
      let pageCodition = 9
      // pagination of 10 pages each
      for (let i = 0; i < pagesNumber; i++) {
        this.filterArray[i] = new Array()
        for (let j = pageIterator; j < pageCodition && j < length; j++) {
          this.filterArray[i].push(this.filter[j])
        }
        pageIterator += 9
        pageCodition += 9
      }
      this.currentPage = this.filterArray[0]
    }

  }


  //---- Hair Product
  filterhairProduct(checked: boolean) {
    this.temporary = [];
    let x = 0;
    if (this.allstatus == false) {
      if (checked) {
        this.filterArray = [];
        this.hairstatus = true;
        for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].category === "Hair Product") {

            this.HairProductsArray[x] = this.products[i];
            console.log("product[i]", this.products[i]);
            x++
          }
        }
        // this.filterArray=this.HairProductsArray
        x = 0;
        if (this.filter.length == this.products.length) {
          this.filter = [];
        }

        let filterLength = this.filter.length;
        for (let k = 0; k < this.HairProductsArray.length; k++) {
          this.filter[filterLength] = this.HairProductsArray[k];
          filterLength++
        }

        this.HairProductsArray = []
        console.log("this.HairProductsArray[i]", this.filter);

        let length = this.filter.length
        let pagesNumber = length / 9
        let pageIterator = 0
        let pageCodition = 9
        // pagination of 10 pages each
        for (let i = 0; i < pagesNumber; i++) {
          this.filterArray[i] = new Array()
          for (let j = pageIterator; j < pageCodition && j < length; j++) {
            this.filterArray[i].push(this.filter[j])
          }
          pageIterator += 9
          pageCodition += 9
        }
        this.currentPage = this.filterArray[0]
      }

      else {
        this.filterArray = [];
        this.hairstatus = false;
        let x = 0
        for (let i = 0; i < this.filter.length; i++) {
          if (this.filter[i].category !== "Hair Product") {
            this.temporary[x] = this.filter[i]
            x++
          }
        }
        this.filter = this.temporary

        let length = this.filter.length
        let pagesNumber = length / 9
        let pageIterator = 0
        let pageCodition = 9
        // pagination of 10 pages each
        for (let i = 0; i < pagesNumber; i++) {
          this.filterArray[i] = new Array()
          for (let j = pageIterator; j < pageCodition && j < length; j++) {
            this.filterArray[i].push(this.filter[j])
          }
          pageIterator += 9
          pageCodition += 9
        }
        this.currentPage = this.filterArray[0]
      }
    }


    if (this.filter.length == 0) {
      this.filterArray = [];
      this.filter = this.products

      let length = this.filter.length
      let pagesNumber = length / 9
      let pageIterator = 0
      let pageCodition = 9
      // pagination of 10 pages each
      for (let i = 0; i < pagesNumber; i++) {
        this.filterArray[i] = new Array()
        for (let j = pageIterator; j < pageCodition && j < length; j++) {
          this.filterArray[i].push(this.filter[j])
        }
        pageIterator += 9
        pageCodition += 9
      }
      this.currentPage = this.filterArray[0]
    }

  }


  //---- Baby Product
  filterbabyProduct(checked: boolean) {
    this.temporary = [];
    let x = 0;
    if (this.allstatus == false) {
      if (checked) {
        this.filterArray = [];
        this.babystatus = true;
        for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].category === "Baby Product") {

            this.BabyProductsArray[x] = this.products[i];
            console.log("product[i]", this.products[i]);
            x++
          }
        }
        // this.filterArray=this.BabyProductsArray
        x = 0;
        if (this.filter.length == this.products.length) {
          this.filter = [];
        }

        let filterLength = this.filter.length;
        for (let k = 0; k < this.BabyProductsArray.length; k++) {
          this.filter[filterLength] = this.BabyProductsArray[k];
          filterLength++
        }

        this.BabyProductsArray = []
        console.log("this.BabyProductsArray[i]", this.filter);

        let length = this.filter.length
        let pagesNumber = length / 9
        let pageIterator = 0
        let pageCodition = 9
        // pagination of 10 pages each
        for (let i = 0; i < pagesNumber; i++) {
          this.filterArray[i] = new Array()
          for (let j = pageIterator; j < pageCodition && j < length; j++) {
            this.filterArray[i].push(this.filter[j])
          }
          pageIterator += 9
          pageCodition += 9
        }
        this.currentPage = this.filterArray[0]
      }

      else {
        this.filterArray = [];
        this.babystatus = false;
        let x = 0
        for (let i = 0; i < this.filter.length; i++) {
          if (this.filter[i].category !== "Baby Product") {
            this.temporary[x] = this.filter[i]
            x++
          }
        }
        this.filter = this.temporary

        let length = this.filter.length
        let pagesNumber = length / 9
        let pageIterator = 0
        let pageCodition = 9
        // pagination of 10 pages each
        for (let i = 0; i < pagesNumber; i++) {
          this.filterArray[i] = new Array()
          for (let j = pageIterator; j < pageCodition && j < length; j++) {
            this.filterArray[i].push(this.filter[j])
          }
          pageIterator += 9
          pageCodition += 9
        }
        this.currentPage = this.filterArray[0]
      }
    }


    if (this.filter.length == 0) {
      this.filterArray = [];
      this.filter = this.products

      let length = this.filter.length
      let pagesNumber = length / 9
      let pageIterator = 0
      let pageCodition = 9
      // pagination of 10 pages each
      for (let i = 0; i < pagesNumber; i++) {
        this.filterArray[i] = new Array()
        for (let j = pageIterator; j < pageCodition && j < length; j++) {
          this.filterArray[i].push(this.filter[j])
        }
        pageIterator += 9
        pageCodition += 9
      }
      this.currentPage = this.filterArray[0]
    }

  }


  allProducts(checked: boolean) {
    if (checked) {
      this.filterArray = [];
      this.allstatus = true;
      this.filter = this.products;

      let length = this.filter.length
      let pagesNumber = length / 9
      let pageIterator = 0
      let pageCodition = 9
      // pagination of 10 pages each
      for (let i = 0; i < pagesNumber; i++) {
        this.filterArray[i] = new Array()
        for (let j = pageIterator; j < pageCodition && j < length; j++) {
          this.filterArray[i].push(this.filter[j])
        }
        pageIterator += 9
        pageCodition += 9
      }
      this.currentPage = this.filterArray[0]
    }

    else {
      this.filterArray = [];
      this.allstatus = false;
      this.filter = [];
      if (this.medicinestatus === true) {
        this.filterMedicine(checked);
      }
      if (this.cosmitcsstatus === true) {
        this.filtercosmiticsProduct(checked);
      }
      if (this.hairstatus === true) {
        this.filterhairProduct(checked);
      }
      if (this.babystatus === true) {
        this.filterbabyProduct(checked);
      }

      if (this.filter.length == 0) {
        this.filter = this.products;
      }

      let length = this.filter.length
      let pagesNumber = length / 9
      let pageIterator = 0
      let pageCodition = 9
      // pagination of 10 pages each
      for (let i = 0; i < pagesNumber; i++) {
        this.filterArray[i] = new Array()
        for (let j = pageIterator; j < pageCodition && j < length; j++) {
          this.filterArray[i].push(this.filter[j])
        }
        pageIterator += 9
        pageCodition += 9
      }
      this.currentPage = this.filterArray[0]
    }

  }

  pagination(index: any) {
    this.currentPage = this.filterArray[index]
  }

}
