import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { allUserApi, allUserRes } from "../Interface";
import { range } from 'rxjs';
import { ExportToCsv } from 'export-to-csv';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']

})
export class AdmindashboardComponent implements OnInit {
  constructor(private auth: AuthService,private toast:ToastrService) { }
  ngOnInit(): void {
    this.auth.search(this.page, this.recordLimit, this.key).subscribe(res => { this.data = res, this.totalpages = res.totalpages, this.noOfPage() })
  }
  data: allUserApi = {
    status: 0,
    error: '',
    data: [],
    totalpages: 1
  }
  page = 1
  totalpages = 1
  recordLimit = 10
  pageRange: Array<number> = []
  key = ""
  currentid=""
  
  noOfPage() // Generating Array for Pagination
  {
    this.pageRange = []
    for (var i = 1; i <= this.totalpages; i++) { this.pageRange.push(i) }
  }
  search(key=this.key,page=this.page,recordlimit=this.recordLimit,){

  }
  toggle() //SideBAr Toggle
  {
    var element = document.getElementById("accordionSidebar");
    var body = document.getElementById("body");
    element?.classList.toggle("toggled");
    body?.classList.toggle("sidebar-toggled");

  }

  setRecordLimit(event: Event) {

    this.recordLimit = +(event.target as HTMLSelectElement).value
    this.auth.search(1, this.recordLimit, this.key).subscribe(res => {
      this.data = res, this.totalpages = res.totalpages, this.noOfPage(), this.page = 1
    })
  }
  setPageNo(pg: number) {
    this.page = pg
    this.auth.search(this.page, this.recordLimit, this.key).subscribe(res => {
      this.data = res, this.totalpages = res.totalpages, this.noOfPage()
    })

  }
  onSearch(key: string) {
    this.key = key
    this.auth.search(this.page, this.recordLimit, key).subscribe(res => {
      this.data = res, this.totalpages = res.totalpages, this.noOfPage(), this.page = 1
    })
  }
  deleteUser(){
    this.auth.deleteUser(this.currentid).subscribe(res =>{console.log(res)
    if(res.success=='true')
      this.toast.success('User Deleted SuccessFully');
      setTimeout(function(){
        window.location.reload()
      },2000);
    })
    // window.location.reload(10000)
  }
  ExportToCsv() {
    const options = {
      filename: 'Register User List',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      useTextFile: false,
      useBom: true,
      headers: ['ID', 'First Name', 'Last Name', 'Email', 'Mobile', 'Role'],
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(this.data.data);
  }
}
