import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css'],
})
export class ErrorPageComponent implements OnInit {
  public message: string;
  public statusCode: string;

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) => {
      this.message = params.get('message');
      this.statusCode = params.get('statusCode');
    });
  }

  ngOnInit() {}
}
