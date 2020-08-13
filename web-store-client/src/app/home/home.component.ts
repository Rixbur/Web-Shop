import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public m_isSelectingShoe: boolean = false;
  public m_season: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  onChangeProductCategory(_event: Event): void {
    let l_selectedCategory = (<HTMLOptionElement>(_event.target)).value;
    console.log("onChangeProductCategory function:");
    console.log("html value:" + l_selectedCategory);
  
    if(l_selectedCategory == '1')
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
    this.m_season=(<HTMLOptionElement>_event.target).value;
  }
  
  isWinterAutumn(): boolean{
      return this.m_season=='zima' || this.m_season=='jesen'; 
  }
  isSummerSpring(): boolean{
      return this.m_season=='prolece' || this.m_season=="leto";
  }
}
