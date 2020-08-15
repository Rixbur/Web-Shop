import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public m_activeElement = 'home';
  constructor() { }

  ngOnInit(): void {
  }

  isElementActive(_element: string){  
    return{
      active : _element==this.m_activeElement,
      'nav-item' : true
    };
  }
  setActiveElement(_element: string){
    this.m_activeElement = _element;
  }
}
