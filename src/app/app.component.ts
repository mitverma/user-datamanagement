import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kent-anwar';
  constructor(private router: Router){
    
  }

  ngOnInit(){
    if(sessionStorage.getItem('isLogin') && sessionStorage.getItem('isLogin') == 'Y'){
      this.router.navigate(['dashboard']);
    }else {
      this.router.navigate(['login']);
    }

  }

  navigate(){
    if(sessionStorage.getItem('isLogin') && sessionStorage.getItem('isLogin') == 'Y'){
      this.router.navigate(['dashboard']);
    }
  }
}
