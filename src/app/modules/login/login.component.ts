import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(public fireStore: AngularFirestore, private router: Router, private  afAuth : AngularFireAuth) {
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
      this.fireStore.collection('users').get().subscribe((userListRes:any) => {
         userList = userListRes.docs.map((list:any) => list.data());
        if(userList && userList.length) {
          let validateUserFromList = userList.find((list: any) => {
            if(list.userName == formData.value.userName && list.password == formData.value.password) {
              return list;
            }
          });
          if(validateUserFromList){
            this.router.navigate(['dashboard']);
            sessionStorage.setItem('isLogin', 'Y');
            this.afAuth.signInWithEmailAndPassword(formData?.value?.userName, formData?.value?.password);
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
