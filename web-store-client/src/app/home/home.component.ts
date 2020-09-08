import { Component, OnInit } from '@angular/core';
import { FilterService } from '../product/filter.service'
import {ProductListComponent} from '../product/product-list/product-list.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public m_isShoe: boolean = undefined;
  public m_selectedName: string = "";
  public m_selectedSeason: string = "";
  public m_maxPrice: number = 100;
  public m_minPrice: number = 0;
  public m_shoeSize: number = 39;

  constructor(private m_productService: FilterService) {
    this.updateFilters();
  }

  ngOnInit(): void {
  }

  onChangeProductCategory(_event: Event): void {
    let l_selectedCategory = (<HTMLOptionElement>(_event.target)).value;
    console.log("onChangeProductCategory function:");
    console.log("html value:" + l_selectedCategory);

    if(l_selectedCategory == 'obuca'){

      this.m_isShoe=true;

    }else if(l_selectedCategory == 'ostalo'){

      this.m_isShoe=false;

    }else{
      this.m_isShoe=undefined;
    }
    this.updateFilters();
  }
  onSearch(_event: Event): void{
    this.m_isShoe=true;
  }

  onChangeName(_event: Event): void{
    this.m_selectedName=(<HTMLInputElement>_event.target).value;

  }
  onChangeSeason(_event: Event): void{
    this.m_selectedSeason=(<HTMLOptionElement>_event.target).value;
    this.updateFilters();
  }

  isWinterAutumn(): boolean {
    return this.m_selectedSeason=='zima' || this.m_selectedSeason=='jesen';
  }
  isSummerSpring(): boolean {
    return this.m_selectedSeason=='prolece' || this.m_selectedSeason=="leto";
  }

  onChangeMin(_event: Event): void {
    this.m_minPrice = parseInt( (<HTMLInputElement>_event.target).value )
    this.updateFilters();
  }
  onChangeMax(_event: Event): void {
    this.m_maxPrice = parseInt( (<HTMLInputElement>_event.target).value )
    this.updateFilters();
  }

  onShoeSizeChange(_event: Event){
    this.m_shoeSize = parseInt((<HTMLInputElement>_event.target).value);
    this.updateFilters();
  }

  updateFilters(){
    this.m_productService.updateFilters({
      isShoe : this.m_isShoe,
      selectedSeason : this.m_selectedSeason,
      maxPrice : this.m_maxPrice,
      minPrice : this.m_minPrice,
      shoeSize : this.m_shoeSize,
      name: this.m_selectedName
      });

  }
}
