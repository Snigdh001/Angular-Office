import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AppComponent } from '../app.component';
import { allApplicationRes, allUserApi } from '../Interface';

@Component({
  selector: 'app-user-loan-application',
  templateUrl: './user-loan-application.component.html',
  styleUrls: ['./user-loan-application.component.css']
})
export class UserLoanApplicationComponent implements OnInit {


  constructor( private auth:AuthService, private appObj:AppComponent){
    this.wid=0;
  }
  ngOnInit(): void {
    this.myApplcationRequest(),
    this.status() 

      }
  data :typeof allApplicationRes[] =[]
  currentid=""
  currentdata:typeof allApplicationRes=allApplicationRes
  wid:number;
  myApplcationRequest()
   {
    this.auth.LoanApplicationById(this.appObj.sessionDetails.id).subscribe(res =>{console.log(res); this.data=res})
   }
   currentDetail(clickedData:typeof allApplicationRes){
    this.currentdata=clickedData

  }
  EmiCalculator(){
    this.auth.emiCalculator("",'10',0).subscribe(res =>{console.log(res)})
  }
  setLoanid(loanid:string)
  {
    localStorage.setItem("loanid",loanid)
  }
  status()
  { console.log(this.wid)
    switch(this.currentdata.status)
    {
      case 'pending':
        this.wid=10
        break
      case 'approved':
        this.wid=30
        break
      case 'pending':
        this.wid=10
        break
      case 'rejected':
        this.wid=20
        break
      case 'verification failed':
          this.wid=40
          break
      case 'verified':
        this.wid=50
        break
      case 'sanctioned':
        this.wid=70
        break
      case 'disbursed':
        this.wid=90
        break
      case 'closed':
          this.wid=100
          break
    }
    
  }
}


