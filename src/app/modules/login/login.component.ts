import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(public fireStore: AngularFirestore, private router: Router) {
    this.loginForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    })
   }

  ngOnInit(): void {
  }

  login(formData: any){
    if(formData.valid){
      let userList = [];
      this.fireStore.collection('users').get().subscribe(userListRes => {
         userList = userListRes.docs.map(list => list.data());
        if(userList && userList.length) {
          let validateUserFromList = userList.find((list: any) => {
            if(list.userName == formData.value.userName && list.password == formData.value.password) {
              return list;
            }
          });
          if(validateUserFromList){
            this.router.navigate(['dashboard']);
            sessionStorage.setItem('isLogin', 'Y');
          } else {
            alert('Username or Password Incorrect');            
          }
          console.log(validateUserFromList, 'validate');
        }
        
      })
    }else {
      alert('Something went wrong');
    }
  }

}
