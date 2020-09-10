import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import {AlertifyService} from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../_models/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
@Output() cancelRegister = new EventEmitter();
user: User;
bsConfig: Partial<BsDatepickerConfig>;
registerForm: FormGroup;
constructor(private authService: AuthService,
   private alertify: AlertifyService,private router: Router) { }

ngOnInit() {
  this.bsConfig= {
    containerClass: 'theme-red'
  },
  this.registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    confirmPassword: new FormControl('', Validators.required),
    gender: new FormControl('male'),
    knownAs: new FormControl('',Validators.required),
    dateOfBirth: new FormControl('null',Validators.required),
    city: new FormControl('',Validators.required),
    country: new FormControl('',Validators.required)


  }, this.passwordMatchValdator
  );
  }
  passwordMatchValdator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null: {'mismatch': true};
  }
  // createRegisterForm () {
  //   this.registerForm = this.fb.group({
  //     username: ['', Validators.required],
  //     password: ['', Validators.required,Validators.minLength(4), Validators.maxLength(8)],
  //     confirmPassword:['', Validators.required]
  //   }, {validator: this.passwordMatchValdator})
  // }
register() {
  if (this.registerForm.valid) {
    this.user = Object.assign({}, this.registerForm.value);
    this.authService.register(this.user).subscribe(()=> {
      this.alertify.success('Registration successful');

    }, error => {
      this.alertify.error(error);
    }, () => {
      this.authService.login(this.user).subscribe(() => {
        this.router.navigate(['/members']);
      });
    });


  }
  // this.authService.register(this.model).subscribe(() => {
  //   this.alertify.success('Registration successful');
  // }, error => {
  //   this.alertify.error(error);
  // });
  }
cancel() {
   this.cancelRegister.emit(false);
   console.log('Canceled');
  }
}
