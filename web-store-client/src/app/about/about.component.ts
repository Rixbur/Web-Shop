import { Subscription, Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConnectionService } from '../services/connection.service';
import { AboutService } from '../services/about.service';
import { About } from '../services/about.model';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {
  public contactUsForm: FormGroup;
  private activeSubscriptions: Subscription[];
  public item : About;

  public m_lat = 44.819812;
  public m_lng = 20.458708;
  loading = false;
  buttonText = "Submit";

  constructor(
    private formBuilder: FormBuilder,
    public http: ConnectionService,
    private aboutService : AboutService
  ) {
    this.activeSubscriptions = [];

    this.aboutService.getAboutInfo()
      .subscribe(item => {
        this.item = item;
      });

    this.contactUsForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      mail: ['', [Validators.required]],
      text: ['', [Validators.required]]
    });
   }
   public submitForm(): void {
    if (!this.contactUsForm.valid) {
      return;
    }

    const data = this.contactUsForm.value;

    this.buttonText = "Submitting..";
    const connSub =  this.http.sendEmail("http://localhost:3000/sendmail/fromuser", data)
    .subscribe(
      data => {
        let res:any = data;
        console.log("Mail has been sent.");
      },
       err => {
        console.log(err);
        this.loading = false;
        this.buttonText = "Submit";
      },() => {
        this.loading = false;
        this.buttonText = "Submit";
      }
    );
    this.activeSubscriptions.push(connSub);
    window.location.href='http://localhost:4200/';

  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.activeSubscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

}
