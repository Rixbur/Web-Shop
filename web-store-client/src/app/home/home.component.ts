import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public m_isSelectingShoe: boolean = false;
  public m_selectedSeason = "";
  public m_maxPrice: number = 100;
  public m_minPrice: number = 0;
  public m_shoeSize: number = 39;

  constructor() { }

  ngOnInit(): void {
  }

  onChangeProductCategory(_event: Event): void {
    let l_selectedCategory = (<HTMLOptionElement>(_event.target)).value;
    console.log("onChangeProductCategory function:");
    console.log("html value:" + l_selectedCategory);
  
    if(l_selectedCategory == 'obuca')
    {
      this.m_isSelectingShoe=true;
    }else
    {
      this.m_isSelectingShoe=false;
    }
  }
  onSearch(_event: Event): void{
    this.m_isSelectingShoe=true;
  }

  onChangeSeason(_event: Event): void{
    this.m_selectedSeason=(<HTMLOptionElement>_event.target).value;
  }
  
  isWinterAutumn(): boolean {
    return this.m_selectedSeason=='zima' || this.m_selectedSeason=='jesen'; 
  }
  isSummerSpring(): boolean {
    return this.m_selectedSeason=='prolece' || this.m_selectedSeason=="leto";
  }

  onChangeMin(_event: Event): void {
    this.m_minPrice = parseInt( (<HTMLInputElement>_event.target).value )  
  }
  onChangeMax(_event: Event): void {
    this.m_maxPrice = parseInt( (<HTMLInputElement>_event.target).value )  
  }

  onShoeSizeChange(_event: Event){
    this.m_shoeSize = parseInt((<HTMLInputElement>_event.target).value);
  }

  getFilters(){
    return {
    isSelectingShoe:this.m_isSelectingShoe,
    selectedSeason:this.m_selectedSeason,
    maxPrice:this.m_maxPrice,
    minPrice:this.m_minPrice,
    shoeSize:this.m_shoeSize
    }
  }
}
