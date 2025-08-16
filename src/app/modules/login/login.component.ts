import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword, user } from '@angular/fire/auth';

import { Firestore, collection, collectionData, addDoc, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private firestore: Firestore, private router: Router, private  auth : Auth) {
    this.loginForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    })
   }

  ngOnInit(): void {
  }

  async login(formData: any){
    if(formData.valid){
      let userList = [];
      const userListRes = collection(this.firestore, 'users');
      console.log(userListRes, "user list");

      const snapshot = await getDocs(userListRes);
      userList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(userList, "user list");
      if(userList && userList.length) {
        let validateUserFromList = userList.find((list: any) => {
          if(list.userName == formData.value.userName && list.password == formData.value.password) {
            return list;
          }
        });
        if(validateUserFromList){
          this.router.navigate(['dashboard']);
          sessionStorage.setItem('isLogin', 'Y');
          // signInWithEmailAndPassword(this.auth, formData?.value?.userName, formData?.value?.password);
        } else {
          alert('Username or Password Incorrect');            
        }
        console.log(validateUserFromList, 'validate');
      }
      // this.fireStore.collection('users').get().subscribe((userListRes:any) => {
      //    userList = userListRes.docs.map((list:any) => list.data());
      //   if(userList && userList.length) {
      //     let validateUserFromList = userList.find((list: any) => {
      //       if(list.userName == formData.value.userName && list.password == formData.value.password) {
      //         return list;
      //       }
      //     });
      //     if(validateUserFromList){
      //       this.router.navigate(['dashboard']);
      //       sessionStorage.setItem('isLogin', 'Y');
      //       signInWithEmailAndPassword(this.auth, formData?.value?.userName, formData?.value?.password);
      //     } else {
      //       alert('Username or Password Incorrect');            
      //     }
      //     console.log(validateUserFromList, 'validate');
      //   }
        
      // })
    }else {
      alert('Something went wrong');
    }
  }

}
