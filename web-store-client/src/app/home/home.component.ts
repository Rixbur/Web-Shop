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

  public m_selectedCategory: string = "";
  public m_selectedTypes: string[] = [];
  public m_selectedName: string = "";
  public m_selectedSeasons: string[] = [];
  public m_maxPrice: number = 100;
  public m_minPrice: number = 0;
  public m_selectedShoeSize: number = 39;

  private m_summerShoeTypes: string[] = ['slippers','sandals','espadrilles'];
  private m_allSeasonShoeTypes: string[] = ['wingtips','sneakers'];
  private m_winterShoeTypes: string[] = ['boots','dustboots','rainboots','snowboots'];
  public m_possibleTypes: string[] = ['wingtips','sneakers'];
  public m_bagTypes: string[] = ['daypack','belt bag','waist bag','rucksack','knapsack'];

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
      this.m_selectedTypes.push(l_inputValue);
    }
    // if the value is unchecked, remove the element from the m_selectedTypes array
    else if(!l_inputElement.checked && this.m_selectedTypes.indexOf(l_inputValue) != -1){
      let l_indexOfElem = this.m_selectedTypes.indexOf(l_inputValue);
      this.m_selectedTypes.splice(l_indexOfElem,1);
    }
    console.dir(this.m_selectedTypes);

    this.updateFilters();
  }

  onChangeProductCategory(_event: Event): void {

    let l_inputElement = (<HTMLInputElement>(_event.target));
    let l_inputValue = (<HTMLInputElement>(_event.target)).value;

    if(l_inputValue != "shoes"){
      this.wipeSelection();
      this.m_possibleTypes=[];
    }
    else if(l_inputValue == "shoes"){
      this.wipeSelection();
      this.m_possibleTypes=[];
      this.m_possibleTypes = this.m_possibleTypes.concat(this.m_allSeasonShoeTypes,this.m_winterShoeTypes,this.m_summerShoeTypes);

    }


    this.m_selectedCategory = l_inputValue;
    this.updateFilters();
  }

  wipeSelection(): void{
    this.m_selectedTypes = [];
    this.m_selectedSeasons = [];
    this.m_selectedShoeSize = 39;
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
      if(this.m_possibleTypes.length==0){
        // console.dir(this.m_possibleTypes);
        this.m_possibleTypes = this.m_possibleTypes.concat(this.m_allSeasonShoeTypes);
      }
      if(l_inputValue == 'summer' || l_inputValue == 'spring' ){
        if(this.m_selectedSeasons.filter(season => season=='summer' || season=='spring').length == 0){
          this.m_possibleTypes = this.m_possibleTypes.concat(this.m_summerShoeTypes);
        }
      }
      else if(l_inputValue == 'winter' || l_inputValue == 'autumn' ){
        if(this.m_selectedSeasons.filter(season => season=='winter' || season=='autumn').length == 0){
          this.m_possibleTypes = this.m_possibleTypes.concat(this.m_winterShoeTypes);
        }
      }
      this.m_selectedSeasons.push(l_inputValue);

    }
    // If the value is unchecked, remove the element from the m_selectedSeasons array
    else if(!l_inputElement.checked && this.m_selectedSeasons.indexOf(l_inputValue) != -1){
      let l_indexOfElem = this.m_selectedSeasons.indexOf(l_inputValue);

      if(l_inputValue == 'summer' || l_inputValue == 'spring' ){
        // Check if there are any relevant seasons that imply keeping similar types of shoes
        if(this.m_selectedSeasons.filter(season => season=='summer' || season=='spring').length == 1){
        this.m_possibleTypes= this.m_possibleTypes.filter(item => this.m_summerShoeTypes.indexOf(item) == -1);
        this.m_possibleTypes= this.m_possibleTypes.filter(item => this.m_summerShoeTypes.indexOf(item) == -1);
        }
      }
      else if(l_inputValue == 'winter' || l_inputValue == 'autumn' ){
        if(this.m_selectedSeasons.filter(season => season=='winter' || season=='autumn').length == 1){
        this.m_possibleTypes = this.m_possibleTypes.filter(item => this.m_winterShoeTypes.indexOf(item) == -1);
        }
      }

      //In case we uncheck all season, we show all the shoes
      if(this.m_possibleTypes == this.m_allSeasonShoeTypes){
        this.m_possibleTypes = this.m_possibleTypes.concat(this.m_summerShoeTypes).concat(this.m_winterShoeTypes);
      }

      // Remove the unchecked season
      this.m_selectedSeasons.splice(l_indexOfElem,1);

      // Update the currently selected types to not containt noncompatible values
      this.m_selectedTypes = this.m_selectedTypes.filter(type => this.m_possibleTypes.indexOf(type) != -1);
    }
    // console.dir(this.m_possibleTypes);
    // console.dir(this.m_selectedTypes);
    this.updateFilters();
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
      selectedTypes : this.m_selectedTypes,
      selectedSeasons : this.m_selectedSeasons,
      maxPrice : this.m_maxPrice,
      minPrice : this.m_minPrice,
      shoeSize : this.m_selectedShoeSize,
      selectedName: this.m_selectedName,
      selectedCategory: this.m_selectedCategory
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
