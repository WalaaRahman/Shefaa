export class Product {
    constructor() { }

    _id: string ;
    pharmacyID: string;
    name: string;
    description: string;
    title: string;
    body: string;
    sideEffects: string;
    photoURL: string;
    price: number;
    quantity: number;
    category: string;
    language: string;
    isAddToCart: boolean = false;
    itemQuantity: number;

}