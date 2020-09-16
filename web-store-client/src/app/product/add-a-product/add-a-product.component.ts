import { ExportableProduct } from '../../product/model/exportable.product.model';
import { ProductService } from '../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-add-a-product',
  templateUrl: './add-a-product.component.html',
  styleUrls: ['./add-a-product.component.css'],
})
export class AddAProductComponent implements OnInit {
  public addAProductForm: FormGroup;
  public allSizes: number[] = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46];
  public selectedSizes = new Map<number, number>();

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.addAProductForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['',[Validators.required]],
      articleType: ['',[Validators.required]],
      category:['',[Validators.required]],
      season: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]],
      productImage:['',[Validators.required]]
    });
  }

  public submitForm(image: HTMLInputElement): void {
    if (!this.addAProductForm.valid) {
      return;
    }

    const data = this.addAProductForm.value;
    data.productImage = image.files;
    console.log(data.productImage);
    data.mapSizeQuantities = new Map<number,number>();

    for (const [size, quantity] of this.selectedSizes) {

      data.mapSizeQuantities.set(size,quantity);
    }
      this.productService
        .addAProduct(data)
        .subscribe((product: ExportableProduct) => {
          window.alert('Successfully added a product!');
          console.log(product);
          this.addAProductForm.reset();
          this.selectedSizes.clear();
        },
        undefined,
        ()=>{this.router.navigate(['/']);
      });

  }

  public getNameErrors() {
    return this.addAProductForm.get('name').errors;
  }
  public getPriceErrors() {
    return this.addAProductForm.get('price').errors;
  }
  public getSizeErrors() {
    return this.addAProductForm.get('size').errors;
  }
  public getArticleTypeErrors() {
    return this.addAProductForm.get('articleType').errors;
  }
  public getSeasonErrors() {
    return this.addAProductForm.get('season').errors;
  }
  public getCategoryErrors() {
    return this.addAProductForm.get('category').errors;
  }
  public getProductImageErrors() {
    return this.addAProductForm.get('productImage').errors;
  }


  public addSize(size:number){
    if(this.selectedSizes.has(size)){
      this.selectedSizes.delete(size);
    } else {
      this.selectedSizes.set(size, 1);
    }
  }

  public minus(size:number){
    const quantity = this.selectedSizes.get(size);
    if(quantity > 0){

      this.selectedSizes.set(size, quantity - 1);
    }
    if((quantity - 1) == 0){

      this.selectedSizes.delete(size);
    }
  }

  public plus(size:number){
    const quantity = this.selectedSizes.get(size);
    this.selectedSizes.set(size, quantity + 1);
  }

  ngOnInit() {}
}
