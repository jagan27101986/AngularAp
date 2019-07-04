import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import {ActivatedRoute,Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import 'rxjs'; 

@Component({
  selector: 'app-detail-call-list',
  templateUrl: './detail-call-list.component.html',
  styleUrls: ['./detail-call-list.component.css']
})
export class DetailCallListComponent implements OnInit {

  id:number;
  data:any;
  customers:any;
  customerObj:object = {};
  title:FormControl;
  firstName:FormControl;
  surName:FormControl;
  Mobile:FormControl;
  Home:FormControl;
  dateSold:string;
  status:string;
   callType:string; 

private headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    
 formGroup: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient,private formBuilder: FormBuilder) { 
    this.createForm();}
    
    createForm(){
        this.title = this.formBuilder.control('',[Validators.required]);
         this.firstName = this.formBuilder.control('',[Validators.required]);
         this.surName = this.formBuilder.control('',[Validators.required]);
         this.Mobile = this.formBuilder.control('',[Validators.required]);
         this.Home = this.formBuilder.control('',[Validators.required]);
       this.formGroup = this.formBuilder.group({
         title: this.title,
         firstName: this.firstName,
         surName: this.surName,
         Mobile: this.Mobile,
         Home: this.Home,
           
    });
    }
/** UPDATE CUSTOMER DATA **/
  updateCustomer() {
      
   if(this.title.value == "" || this.firstName.value == "" || this.firstName.value == "" ) {
       return;
   } else if(this.Mobile.value == "" || this.Home.value == "") {
       return;
   } else {
       
    this.customerObj = {
      title: this.title.value,
      firstName: this.firstName.value,
      surName: this.surName.value,
      Mobile: this.Mobile.value,
      Home: this.Home.value,
      dateSold:this.dateSold,
      status: this.status,
      callType: this.callType,
    };
           
      console.log(this.customerObj);
    const url = `${"http://localhost:4201/customerData"}/${this.id}`;
    this.http.put(url, JSON.stringify(this.customerObj), {headers: this.headers})
      .toPromise()
      .then(() => {
        this.router.navigate(['/']);
      })
}
  }
    /** CALL MOBILE DATA **/
     callMobileNumber(){
        if(this.Home.value != ""){
            window.location.href="tel://"+this.Mobile.value;
        }
        
    }
 /** CALL HOME DATA **/
    callHomeNumber(){
        if(this.Home.value != ""){
            window.location.href="tel://"+this.Home.value;
        }
        
    }
    
    /** RESET CUSTOMER DATA **/
    resetCustomer() {
    const url = `${"http://localhost:4201/customerData"}/${this.id}`;
    this.http.put(url, JSON.stringify(this.data), {headers: this.headers})
      .toPromise()
      .then(() => {
        this.router.navigate(['/']);
      })
  }
    
    /** COMPLETED CALL Change Status to Completed **/
    completeCall() {
    if(this.title.value == "" || this.firstName.value == "" || this.firstName.value == "" ) {
       return;
   } else if(this.Mobile.value == "" || this.Home.value == "") {
       return;
   }
    else {
    const url = `${"http://localhost:4201/customerData"}/${this.id}`;
   this.customerObj = {
      title: this.data.title,
      firstName: this.data.firstName,
      surName: this.data.surName,
      Mobile: this.data.Mobile,
      Home: this.data.Home,
      dateSold:this.data.dateSold,
      status: "COMPLETED",
      callType: this.data.callType,
    };
        
    this.http.put(url, JSON.stringify(this.customerObj), {headers: this.headers})
      .toPromise()
      .then(() => {
        this.router.navigate(['/']);
      })        
    }    
        
  }

    /*** GET ALL DETAILS OF PARTICULAR CUSTOMER  **/
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.http.get("http://localhost:4201/customerData").subscribe(
      (res) => {
        this.customers = res;
        for(var i = 0; i < this.customers.length ; i++) {
          if(parseInt(this.customers[i].id) === this.id) {
            this.data = this.customers[i];
            this.title.setValue(this.data.title);
            this.firstName.setValue(this.data.firstName); 
            this.surName.setValue(this.data.surName); 
            this.Mobile.setValue(this.data.Mobile); 
            this.Home.setValue(this.data.Home);
              this.dateSold = this.data.dateSold;
               this.status = this.data.status;
               this.callType = this.data.callType;
          }
        }
      }
    )
  }
}
