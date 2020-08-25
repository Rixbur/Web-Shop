import { Component, OnInit } from '@angular/core';
import { ConnectionService} from '../services/connection.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  buttonText = "Submit";
  loading = false;

  constructor(public http: ConnectionService) { }

  ngOnInit(): void {
  }

  register() {
    this.loading = true;
    this.buttonText = "Submitting..";
    let user = {
      name: 'Korisnik',
      email: 'korisnik.tester2@gmail.com',
      cart: ''
    }
    this.http.sendEmail("http://localhost:3000/sendmail", user).subscribe(
      data => {
        let res:any = data; 
        console.log("${user.name}, mail has been sent. Id:  ${res.messageId}");
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
  }

}
