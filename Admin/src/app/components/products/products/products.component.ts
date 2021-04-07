import { Component, OnInit } from '@angular/core';
import { Product } from "./../../../models/Product";
import { APIResponse } from './../../../models/Api-response';
import { UserService } from './../../../services/user.service';
import { ApiService } from './../../../services/api.service';
import { FavouriteService } from 'src/app/services/favourite.service';
import { CartService } from 'src/app/services/cart.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  cartfake: any;
  favouritefake: any;

  constructor(private _apiService: ApiService, private _cartService: CartService, private _userService: UserService,private _favouriteService:FavouriteService ) { }
  products: Product[] = [];
  userId: any;
  filterArray:any []=[];
  medicineArray:any[]=[];
  hairProductsArray:any[]=[];
  priceArray:any[]=[];
  temporary:any[]=[]
  paginate:any[]=[];
  currentPage:any[]=[];


  allstatus:boolean=false;
  medicinestatus:boolean=false;
  cosmitcsstatus:boolean=false;
  
  pages:number=10;

  ngOnInit(): void {
    //---- Get User
    let token = this._userService.getToken()
    console.log("Token is:", token)
    this._apiService.get('user/get/' + token).subscribe((response) => {
      let obj = response as APIResponse
      console.log("Data from server", obj)
      this.userId = obj.Data["id"]
    })

    // ---- Get Products
    this._apiService.get("product").subscribe((response) => {
      let obj = response as APIResponse;
      console.log("Data from server", obj);
      if (obj.status) {
        let productData = obj.Data
        this.products = productData
        //for(let i = 0; i <2; i++ )
        // this.paginate=[];
        // for(let i = 0; i < this.len; i++ ){
        //   this.paginate[i]=this.filterArray[i];
        //   console.log(this.filterArray[i]);
        //   console.log(this.len)
        // }

        this.filterArray=this.products;

        let length = this.filterArray.length
        let pagesNumber = length / 10
        let pageIterator = 0
        let pageCodition = 10
        // pagination of 10 pages each
        for (let i =0; i<pagesNumber ;i++){
          this.paginate[i]= new Array()
          for(let j =pageIterator; j< pageCodition && j < length; j++){
           this.paginate[i].push(this.filterArray[j]) 
          }
          pageIterator+= 10
          pageCodition+=10
          console.log("this.paginate[i]",this.paginate[i]);
          
        }

        this.currentPage=this.paginate[0]


        

        




        // ///---- Medicine Array
        // let j=0;
        // for(let i =0 ;  i<this.products.length ; i++){
        //   if(this.products[i].category==="medicines"){

        //     this.medicineArray[j]=this.products[i];
        //     console.log("product[i]", this.products[i]);
        //     j++
        //   }
        // }

        // ///----- Hair Product Array
        // let x=0;
        // for(let i =0 ; i<this.products.length ; i++){
        //   if(this.products[i].category==="cosmitcs"){

        //     this.hairProductsArray[x]=this.products[i];
        //     console.log("product[i]", this.products[i]);
        //     x++       
        //   }
        // }

        console.log("Product retreived is: ", this.products)
      }
      else {
        alert(obj.message)
      }
    })

    //---- Get Cart Products
    let token1 = this._userService.getToken()
    console.log("Token is:", token1)
    this._apiService.get('user/get/' + token1).subscribe((response) => {
      let obj = response as APIResponse
      console.log("Data from server", obj)
      this.userId = obj.Data["id"]
    })
    this._apiService.get("cart").subscribe((response) => {
      let obj = response as APIResponse;

      console.log("Data from server cart", obj.Data);
      if (obj.status) {
        let cartData = obj.Data
        this.cartfake = cartData

        console.log("Product retreived is faaaaaake: ", this.cartfake[0].cartProducts)


      }
      else {
        alert(obj.message)
      }
    })

    //---- Get FavouriteProducts
    this._apiService.get("favourite").subscribe((response)=>{
      let obj = response as APIResponse;
     
      console.log("Data from server favourite",obj.Data);
      if(obj.status){
        let favouriteData = obj.Data
         this.favouritefake = favouriteData
         console.log("Favourite product retreived is: ",this.favouritefake[0].favouriteProducts)
       }
       else{
         alert(obj.message)
       }
    })

  }

  pagination(index:any){
   this.currentPage=this.paginate[index]

  }

  addToCart(product: Product) {
    this._cartService.addToCart(product, this.userId);
    
  }


  addToFavourite(product: Product) {
    this._favouriteService.addToFavourite(product, this.userId);
   
  }

  
 //---- Filter Begins

 //---- Medicine
  filterMedicine(checked:boolean){
    this.temporary=[];
    let j=0;
    if(this.allstatus==false){
      if(checked){
        this.medicinestatus=true;
        for(let i =0 ;  i<this.products.length ; i++){
          if(this.products[i].category==="medicine" || this.products[i].category==="Medicine" ){
  
            this.medicineArray[j]=this.products[i];
            console.log("product[i]", this.products[i]);
            j++
          }
        }
        // this.filterArray=this.medicineArray
        j=0;
        if(this.filterArray.length==this.products.length){
          this.filterArray=[];
        }
        
        let filterLength=this.filterArray.length;
        for(let k=0;k<this.medicineArray.length;k++)
        {
          this.filterArray[filterLength]=this.medicineArray[k];
          filterLength++
        }
        
        this.medicineArray=[];
        console.log("this.medicineArray[i]",this.filterArray);  
      }
  
      else{
        this.medicinestatus=false;
         let x=0
        //   if(this.temporary.length>0){
        //     x=this.temporary.length
        //   }
        for(let i =0 ;  i<this.filterArray.length ; i++){
          if(this.filterArray[i].category!=="medicine" && this.products[i].category!=="Medicine" )
          {
            this.temporary[x]=this.filterArray[i]
            x++
          }
        }
        this.filterArray=this.temporary
        // this.filterArray=this.products
      }
    }
    

    if(this.filterArray.length==0)
    {
      this.filterArray=this.products
    }

  }

  //---- Hair Product
  filterHairProduct(checked:boolean){
    this.temporary=[];
    let x=0;
    if(this.allstatus==false){
      if(checked){
        this.cosmitcsstatus=true;
        for(let i =0 ; i<this.products.length ; i++){
          if(this.products[i].category==="Hair Products"){
  
            this.hairProductsArray[x]=this.products[i];
            console.log("product[i]", this.products[i]);
            x++       
          }
        }
        // this.filterArray=this.hairProductsArray
        x=0;
        if(this.filterArray.length==this.products.length){
          this.filterArray=[];
        }
  
        let filterLength=this.filterArray.length;
        for(let k=0;k<this.hairProductsArray.length;k++)
        {
          this.filterArray[filterLength]=this.hairProductsArray[k];
          filterLength++
        }
  
        this.hairProductsArray=[]
        console.log("this.hairProductsArray[i]",this.filterArray);
      }
  
      else{
        this.cosmitcsstatus=false;
        let x=0
        for(let i =0 ;  i<this.filterArray.length ; i++){
          if(this.filterArray[i].category!=="Hair Products")
          {
            this.temporary[x]=this.filterArray[i]
            x++
          }
        }
        this.filterArray=this.temporary
      }
    }
    

    if(this.filterArray.length==0)
    {
      this.filterArray=this.products
    }

  }

  allProducts(checked:boolean){
    if(checked){
      this.allstatus=true;
      this.filterArray=this.products;
    }
    
    else{
      this.allstatus=false;
      this.filterArray=[];
      if(this.medicinestatus===true){
        this.filterMedicine(checked);
      }
      if(this.cosmitcsstatus===true){
        this.filterHairProduct(checked);
      }
      
      if(this.filterArray.length==0){
        this.filterArray=this.products;
      }
    }
    
  }

  // len=(this.products.length);

  // firstPage(){
  //   let len=(this.products.length)/4;
  //   this.paginate=[];
  //   for(let i = 0; i < 2; i++ ){
  //     this.paginate[i]=this.filterArray[i];
  //     console.log(this.filterArray[i]);
  //     console.log(len)
  //   }
  // }

  // secondPage(){
  //   this.paginate=[];
  //   for(let i = 0; i < 2; i++ ){
  //     this.paginate[i]=this.filterArray[i+2];
  //     console.log(this.filterArray[i+2]);
  //   }
  // }

  // thirdPage(){
  //   this.paginate=[];
  //   for(let i = 0; i < 2; i++ ){
  //     this.paginate[i]=this.filterArray[i+(2*2)];
  //     console.log(this.filterArray[i+(2*2)]);
  //   }
  // }

  // fourthPage(){
  //   this.paginate=[];
  //   for(let i = 0; i < 2; i++ ){
  //     this.paginate[i]=this.filterArray[i+(2*3)];
  //     console.log(this.filterArray[i+(2*3)]);
  //   }
  // }
  

}