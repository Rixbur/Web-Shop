import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-a-product',
  templateUrl: './add-a-product.component.html',
  styleUrls: ['./add-a-product.component.css'],
})
export class AddAProductComponent implements OnInit {
  public addAProductForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {
    this.addAProductForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['',[Validators.required]],
      articleType: ['',[Validators.required]],
      category:['',[Validators.required]],
      season: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]],
      size: ['', [Validators.required]],
      productImage:['',[Validators.required]]
    });
  }

  public submitForm(image: HTMLInputElement): void {
    if (!this.addAProductForm.valid) {
      window.alert('Not valid!');
      return;
    }
    console.log(image.files[0]);
    console.log(image.files[1]);
    const data = this.addAProductForm.value;
    data.productImage = image.files;
    console.log(data.productImage);

    this.productService
      .addAProduct(data)
      .subscribe((product: Product) => {
        window.alert('Successfully added a product!');
        console.log(product);
        this.addAProductForm.reset();
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

  ngOnInit() {}
}
