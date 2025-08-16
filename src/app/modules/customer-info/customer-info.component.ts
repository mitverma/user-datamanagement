import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent implements OnInit {
  displayedColumns: string[] = ['checkbox','fullname','phoneno', 'complaintno','area', 'product','modelno', 'serialno', 'purchasedate','callType', 'technicianName', 'billno','amount', 'remarks', 'visitDate', 'address', 'action'];
  displayedFilteredColumns: string[] = ['fullname','phoneno', 'complaintno','area', 'product','modelno', 'serialno', 'purchasedate', 'callType','technicianName', 'billno','amount', 'remarks', 'visitDate', 'address'];
  dataSource = new MatTableDataSource<any>();
  filteredList = new MatTableDataSource<any>();
  listData: Array<any> = ['Amit', 'Verma', 'Cool', 'Guy'];

  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private fireStore: Firestore, private commonService: CommonService, private router: Router) { }

  ngOnInit(): void {
    // this.fireStore.collection('customerData').get().subscribe((data: any) => {
    //   console.log(data,'data');
    //   let customerList = data.docs.map((list: any) => {
    //     console.log(list.id);
    //     let obj = list.data();
    //     obj['id'] = list.id;
    //     // return { id : list.id, ...list.data()}
    //     return obj;
    //   });
    //   console.log(customerList, 'customer list');
      
    //   // map the latest technician latest details
    //   customerList?.map((item: any) => {
    //     let getLatestTechnicianDetails = item?.technicalDetails[item?.technicalDetails.length - 1 ];
    //     item.amount = getLatestTechnicianDetails?.amount;
    //     item.billNo = getLatestTechnicianDetails?.billNo;
    //     item.technicianName = getLatestTechnicianDetails?.technicianName;
    //     item.technicianRemarks = getLatestTechnicianDetails?.technicianRemarks;
    //     item.visitDate = getLatestTechnicianDetails?.visitDate;
    //     return item;
    //   })
    //   // map the latest technician latest details end

    //   customerList = this.sortArray(customerList);
    //   this.dataSource = new MatTableDataSource(customerList);
    //   // this.filteredList = new MatTableDataSource([]);
    //   // this.dataSource.paginator = this.paginator;
    // })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // this.filteredList.filter = filterValue.trim().toLowerCase();
  }

  editData(rowData: any){
    console.log(rowData);
    this.commonService.customerData = rowData;
    this.router.navigate(['customerentry']);
  }

  delete(rowData: any, index: any){
    console.log(rowData);

    var confirmation = confirm('Are you sure you want to delete');
    // if(confirmation){
    //   this.fireStore.doc('customerData/'+ rowData.id).delete();
    //   this.dataSource.data.splice(index,1);
    //   this.dataSource.filter = ""; 
    // }
    
  }


  selectVal(val: any, rowData: any){
    console.log(rowData, val);
    let getIndex = this.filteredList.data.findIndex(list => list.id == rowData.id);
    console.log(getIndex);
    if(val && rowData){
      this.filteredList.data.push(rowData);
      this.filteredList.filter = "";
    }else {
      if(getIndex != -1){
        this.filteredList.data.splice(getIndex,1);
        this.filteredList.filter = "";
      }
    }
  }

//   print(): void {
//     let printContents: any;
//     let  popupWin: any;
//     printContents = document.getElementById('print-section').innerHTML;
//     popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
//     popupWin.document.open();
//     popupWin.document.write(`
//       <html>
//         <head>
//           <title>Print tab</title>
//           <style>
//           body {
//             -webkit-print-color-adjust: exact !important; 
//           }
//           .repeat {
//             page-break-before: always;
//           }
//           .tableprint {
//             width: 100%;
//             border: 1px solid #000;
//             }
//             .row-head, .row-head td {
//               width: 100%;
//               margin-top: -4px;
//               padding: 10px;
//               font-size: 18px;
//               background-color: #000 !important;
//               color: #fff;
//               -webkit-print-color-adjust: exact !important; 
//           }
//           .row-data td {
//               width: 33.33% !important;
//               border-right: 1px solid #000;
//               border-bottom: 1px solid #000;
//               vertical-align: top;
//             }
//             .data-wrapper {
//                 margin-bottom: 15px;
//             }
//             .address p {
//               margin: 0;
//               font-size: 12px;
//             }
//             .faber {
//               margin: 20px 0 0;
//               text-align: center;
//             }
//           </style>
//         </head>
//     <body onload="window.print();window.close()">${printContents}</body>
//       </html>`
//     );
//     popupWin.document.close();
// }


downloadSelected(exporter: any){
  let getInput = prompt('Please enter password to download');
  if(getInput && getInput == 'Ratna@6273'){
    exporter.exportTable('xlsx',{fileName:'ratnam_enterprise'});
  }
}

downloadAll(exporter: any){
  let getInput = prompt('Please enter password to download');
  if(getInput && getInput == 'Ratna@6273'){
    // this.filteredList.data = this.dataSource.data;
    this.filteredList.data = this.dataSource.data;
    this.filteredList.filter = "";
    console.log(this.filteredList.data);
    setTimeout(()=> {
      exporter.exportTable('xlsx',{fileName:'ratnam_enterprise'});
    },100);
    setTimeout(() => {
     this.router.navigate(['dashboard']);
    }, 5000);
  }else {
    alert('Password is incorrect');
  }
}


sortArray(list: any){
  return list.sort((a: any,b: any) => {
    var aDateArray = a.visitDate.split('/');
    var aDate = aDateArray[2]+'-'+aDateArray[1]+'-'+aDateArray[0];
    var bDateArray = b.visitDate.split('/');
    var bDate = bDateArray[2]+'-'+bDateArray[1]+'-'+bDateArray[0];
    var aDateVal = new Date(aDate).valueOf();
    var bDateVal = new Date(bDate).valueOf();
    return bDateVal - aDateVal;
  })
}

}

// 5390893873
// 9326362007

// 860786043600504

// 860786043600512