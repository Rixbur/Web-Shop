import { Component, OnInit } from '@angular/core';
import { FilterService } from '../services/filter.service';
import {ProductListComponent} from '../product/product-list/product-list.component';
import { Options, LabelType } from '@m0t0r/ngx-slider';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public m_selectedCategories: boolean[] = [];
  public m_selectedTypes: string[] = [];
  public m_selectedName: string = "";
  public m_selectedSeasons: string[] = [];
  public m_maxPrice: number = 100;
  public m_minPrice: number = 0;
  public m_selectedShoeSize: number = 39;

  constructor(private m_productService: FilterService) {
    this.updateFilters();
  }

  ngOnInit(): void {
  }



  onChangeType(_event: Event): void {

    let l_inputElement = (<HTMLInputElement>(_event.target));
    let l_inputValue = (<HTMLInputElement>(_event.target)).value;


    // If the checked value isn't the m_selectedTypes array, add it
    if(l_inputElement.checked && this.m_selectedTypes.indexOf(l_inputValue) == -1){
      this.m_selectedTypes.push()
    }
    // if the value is unchecked, remove the element from the m_selectedTypes array
    else if(!l_inputElement.checked && this.m_selectedTypes.indexOf(l_inputValue) != -1){
      let l_indexOfElem = this.m_selectedTypes.indexOf(l_inputValue);
      this.m_selectedTypes.splice(l_indexOfElem,1);
    }

    this.updateFilters();
  }

  onChangeProductCategory(_event: Event): void {

    let l_inputElement = (<HTMLInputElement>(_event.target));
    let l_inputValue = (<HTMLInputElement>(_event.target)).value == "shoes" ? true : false;


    // If the checked value isn't the m_selectedCategories array, add it
    if(l_inputElement.checked && this.m_selectedCategories.indexOf(l_inputValue) == -1){
      this.m_selectedCategories.push()
    }
    // if the value is unchecked, remove the element from the m_selectedCategories array
    else if(!l_inputElement.checked && this.m_selectedCategories.indexOf(l_inputValue) != -1){
      let l_indexOfElem = this.m_selectedCategories.indexOf(l_inputValue);
      this.m_selectedCategories.splice(l_indexOfElem,1);
    }
    this.updateFilters();
  }


  onChangeName(_event: Event): void{
    this.m_selectedName=(<HTMLInputElement>_event.target).value;
    this.updateFilters();

  }
  onChangeSeason(_event: Event): void{
    let l_inputElement = (<HTMLInputElement>(_event.target));
    let l_inputValue = (<HTMLInputElement>(_event.target)).value;


    // If the checked value isn't the m_selectedSeasons array, add it
    if(l_inputElement.checked && this.m_selectedSeasons.indexOf(l_inputValue) == -1){
      this.m_selectedSeasons.push()
    }
    // if the value is unchecked, remove the element from the m_selectedSeasons array
    else if(!l_inputElement.checked && this.m_selectedSeasons.indexOf(l_inputValue) != -1){
      let l_indexOfElem = this.m_selectedSeasons.indexOf(l_inputValue);
      this.m_selectedSeasons.splice(l_indexOfElem,1);
    }
    this.updateFilters();
  }

  isWinterAutumn(): boolean {
    let targetSeasons = ['winter', 'autumn'];
    return this.m_selectedSeasons.map(season => targetSeasons.indexOf(season)).filter(i => i!=-1).length > 0;
  }
  isSummerSpring(): boolean {
    let targetSeasons = ['spring', 'summer'];
    return this.m_selectedSeasons.map(season => targetSeasons.indexOf(season)).filter(i => i!=-1).length > 0;
  }


  onChangeRange(): void{
    this.updateFilters();
  }

  onShoeSizeChange(_event: Event){
    this.m_selectedShoeSize = parseInt((<HTMLInputElement>_event.target).value);
    this.updateFilters();
  }

  updateFilters(){
    this.m_productService.updateFilters({
      selectedTypes : this.m_selectedCategories,
      selectedSeasons : this.m_selectedSeasons,
      maxPrice : this.m_maxPrice,
      minPrice : this.m_minPrice,
      shoeSize : this.m_selectedShoeSize,
      name: this.m_selectedName,
      selectedCategories: this.m_selectedTypes
      });
  }

  options: Options = {
    floor: 0,
    ceil: 100,
    translate: (value: number, label: LabelType): string => {

      return '';
    }
  };
}
