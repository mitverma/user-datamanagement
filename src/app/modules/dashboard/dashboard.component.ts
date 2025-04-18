import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router,private commonService : CommonService) { }

  ngOnInit(): void {
  }

  openLink(routeTo: any){
    this.router.navigate([routeTo]);
    this.commonService.customerData = null;
  }

}
