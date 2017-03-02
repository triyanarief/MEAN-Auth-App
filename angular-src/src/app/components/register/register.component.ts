import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService, private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // require fields
    if(!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Kolom gak boleh ada yang kosong gan', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Email gak valid gan', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Register User
    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {
        this.flashMessage.show('Selamat kamu sudah terdaftar dan bisa log in', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Ada yang salah nih, coba lebih teliti lagi', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    })
  }

}
