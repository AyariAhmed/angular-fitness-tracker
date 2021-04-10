import { Component, OnInit } from '@angular/core';
import {FormGroup, NgForm} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  maxDate: Date;
  hide : Boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 16);
  }

  submitForm(f: NgForm) {
    const form : FormGroup = f.form;
    console.log(form);

  }
}
