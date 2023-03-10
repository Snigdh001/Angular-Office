import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { allApplicationApi, allApplicationRes, allUserApi, allUserRes, authResponse, delResponse, requestRespnse, signupInterface } from '../Interface';
import { NgForm } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseurl = "http://localhost/snigdh_ci4/api";
  constructor(private http: HttpClient) { }
  getToken=()=>{
    let userLogged = localStorage.getItem("Session") as string;
    let token=JSON.parse(userLogged).authorization;
    if(token)  
      return token;  
    else
      return "NULL";
  }

  login(data: NgForm) {
    return this.http.post<authResponse>(this.baseurl + '/login', data)
  }
  signUp(data: typeof signupInterface) {
    return this.http.post<authResponse>(this.baseurl + '/signup', data)
  }
  allRegisterUser(page:number,record:number) {
    return this.http.get<allUserApi>(this.baseurl+`/allusers?page=${page}&recordlimit=${record}`,{headers:{
      'Authorization': this.getToken()}})
  }
  search(page:number=1,record:number=10,key:string) {
    return this.http.get<allUserApi>(this.baseurl+`/search?page=${page}&recordlimit=${record}&keyWord=${key}`)
  }
  searchApplcation(page:number=1,record:number=5,key:string='') {
    return this.http.get<allApplicationApi>(this.baseurl+`/searchApplication?page=${page}&recordlimit=${record}&keyWord=${key}`)
  }
   updateStatus(data:NgForm) {
    return  this.http.post<requestRespnse>(this.baseurl+`/loanAction`,data)
  }
  deleteUser(id:string="") {
    return  this.http.delete<delResponse>(this.baseurl+`/deleteuser/${id}`)
  }
  ApplyLoan(data:typeof allApplicationRes) {
    return  this.http.post<requestRespnse>(this.baseurl+'/loanapply',data)
  }
  LoanApplicationById(userId:string) {
    return  this.http.get<[]>(this.baseurl+`/allApplicationById?userId=${userId}`)
  }
  emiCalculator(loanAmt:string,interest_rate:string="10",duration_years:number)
  {
    return this.http.get<any>(`https://api.api-ninjas.com/v1/mortgagecalculator?loan_amount=${loanAmt}&interest_rate=${interest_rate}&duration_years=${duration_years}`,{headers:{'X-Api-Key': 'jLhm4ii3StYojHxIHNN0ag==38QUXaD94DNQEPcO'}})
  }
  setEmiDetails(loanid:number)
  {
    return this.http.get<any>(this.baseurl+`/EmiDetails?loanid=${loanid}`)
  }
  setEmiPaidStatus(id:number)
  {
    return this.http.get<boolean>(this.baseurl+`/EmiPaid?id=${id}`)
  }
  emiChart(data:any)
  { 
    return this.http.post<any>(this.baseurl+`/EmiChart`,data)
  }
}
