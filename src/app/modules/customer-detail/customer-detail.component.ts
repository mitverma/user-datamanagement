import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
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
  callTypeList: Array<String> = [];
  constructor(private fireStore: Firestore, private commonService: CommonService, private router: Router, private formBuilder: FormBuilder) {
    this.customerDetail = this.formBuilder.group({
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
      technicalDetails: new FormArray([this.createTechnicanGroup()])
    })

    this.productList = ['RO Membrane In Wielded Housing', 'SHF RO Membrane In Wielded Housing', 'HF RO Membrane In Wielded Housing', 'RO Membrane In Wielded Compact', 'UF Membrane In Wielded Housing', 'Inline Sediment Filter', 'Inline Carbon Filter', 'Post Carbon Filter', 'Inline UF Filter', 'Sediment Filter']; // more need to be added or given by the client
    this.callTypeList = ['Warranty', 'Out of Warranty', 'Contract']

  }

  ngOnInit(): void {
    console.log(this.commonService.customerData, 'customer data');
    if(this.commonService.customerData){
      if(this.commonService?.customerData?.technicalDetails?.length){
        this.commonService?.customerData?.technicalDetails?.forEach((item: any, index: number) => {
          let visitSplitArray = this.commonService.customerData.visitDate.split('/');
          let date = visitSplitArray[2]+'-'+visitSplitArray[1]+'-'+(visitSplitArray[0]);
          this.commonService.customerData.technicalDetails[index].visitDate = new Date(date);
        })
        this.customerDetail.patchValue(this.commonService.customerData);        
      } 
      this.addTechnicanGroup();     
    }
  }
  

  addTechnicanGroup(){
    (this.customerDetail.get('technicalDetails') as FormArray).push(this.createTechnicanGroup())
  }

  createTechnicanGroup():FormGroup{
    return this.formBuilder.group({      
      technicianName : new FormControl(null, [Validators.required]),
      technicianRemarks: new FormControl(null, [Validators.required]),
      billNo: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
      visitDate: new FormControl(null),
    })
  }

  saveCustomerDetails(formData: any){

    if(formData?.value?.technicalDetails?.length){
      formData?.value?.technicalDetails.forEach((itemFormData: any) => {
        var getVisitDate = itemFormData.visitDate;
        var getDate = getVisitDate.getDate() && getVisitDate.getDate() < 10 ? '0'+ getVisitDate.getDate(): getVisitDate.getDate();
        var getMonth = getVisitDate.getMonth() && (getVisitDate.getMonth()+1) < 10 ? ('0'+ (getVisitDate.getMonth()+1)): (getVisitDate.getMonth()+1);
        var getYear = getVisitDate.getFullYear();
        var setVisitDate = getDate+'/'+getMonth+'/'+getYear;
        itemFormData.visitDate =  setVisitDate;
      })
    }


    if(formData && formData.valid) {      
      console.log(this.fireStore, 'fire store');
      // if customer data is present then edit method is there and update
      // if(this.commonService.customerData && this.commonService.customerData.id){
      //   this.fireStore.doc('customerData/' + this.commonService.customerData.id).update(formData.value).then(update => {
      //     console.log('sucess');
      //     this.commonService.customerData = null;
      //     this.customerDetail.reset();
      //     this.router.navigate(['customerinfo']);
      //   })
      // }else {        
      //   this.fireStore.collection('customerData').add(formData.value).then(response => {
      //     this.customerDetail.reset();
      //     this.customerDetail.markAsUntouched();
      //   }, error => {
      //     alert('something went wrong contact admin');
      //   })
      // }
      
    }else {
      alert('something went wrong');
    }
  }


  get technicalDetails(): FormArray {
    return this.customerDetail.get('technicalDetails') as FormArray;
  }
}
