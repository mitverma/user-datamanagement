import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CommonService } from '../../services/common.service';
import { Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  customerDetail: FormGroup;
  productList: Array<String> = [];
  constructor(private fireStore: AngularFirestore, private commonService: CommonService, private router: Router) {
    this.customerDetail = new FormGroup({
      fullName: new FormControl(null, [Validators.required]),
      // emailId: new FormControl(null),
      contactNo: new FormControl(null, [Validators.required]),
      complaintNo: new FormControl(null, [Validators.required]),
      address: new FormControl(null),
      area: new FormControl(null),
      productType: new FormControl(null, [Validators.required]),
      modelNo: new FormControl(null, [Validators.required]),
      serialNo: new FormControl(null, [Validators.required]),
      purchaseDate: new FormControl(null, [Validators.required]),
      callType: new FormControl(null),
      technicianName : new FormControl(null, [Validators.required]),
      technicianRemarks: new FormControl(null, [Validators.required]),
      billNo: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
      visitDate: new FormControl(null),
    })

    this.productList = ['Barbeque', 'Bio Disposer', 'Built in Microwave Oven', 'Built in Oven', 'Chimney', 'Coffee Machine', 'Cooking Range', 'Cooktop', 'Deep Fryer', 'Dishwasher', 'Hob', 'Induction Cooker', 'Mixer Grinder', 'Pop up Toaster', 'Refrigerator', 'Rice Cooker', 'Sinks', 'Stand Alone MWO', 'Taps', 'Water Purifier'];

  }

  ngOnInit(): void {
    console.log(this.commonService.customerData, 'customer data');
    if(this.commonService.customerData){
      let visitSplitArray = this.commonService.customerData.visitDate.split('/');
      let date = visitSplitArray[2]+'-'+visitSplitArray[1]+'-'+(visitSplitArray[0]);
      this.commonService.customerData.visitDate = new Date(date);
      this.customerDetail.patchValue(this.commonService.customerData);
    }
  }

  saveCustomerDetails(formData: any){
    var getVisitDate = formData.value.visitDate;
    var getDate = getVisitDate.getDate() && getVisitDate.getDate() < 10 ? '0'+ getVisitDate.getDate(): getVisitDate.getDate();
    var getMonth = getVisitDate.getMonth() && (getVisitDate.getMonth()+1) < 10 ? ('0'+ (getVisitDate.getMonth()+1)): (getVisitDate.getMonth()+1);
    var getYear = getVisitDate.getFullYear();
    var setVisitDate = getDate+'/'+getMonth+'/'+getYear;
    if(formData && formData.valid) {
      formData.value.visitDate =  setVisitDate;
      console.log(this.fireStore, 'fire store');
      // if customer data is present then edit method is there and update
      if(this.commonService.customerData && this.commonService.customerData.id){
        this.fireStore.doc('customerData/' + this.commonService.customerData.id).update(formData.value).then(update => {
          console.log('sucess');
          this.commonService.customerData = null;
          this.customerDetail.reset();
          this.router.navigate(['customerinfo']);
        })
      }else {        
        this.fireStore.collection('customerData').add(formData.value).then(response => {
          this.customerDetail.reset();
          this.customerDetail.markAsUntouched();
        }, error => {
          alert('something went wrong contact admin');
        })
      }
      
    }else {
      alert('something went wrong');
    }
  }

}
