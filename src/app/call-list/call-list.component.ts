import { Component, OnInit,ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {MatTableDataSource,MatSortModule} from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';

export interface CallType {
  value: string;
  viewValue: string;
}

export interface Status {
  value: string;
  viewValue: string;
}



@Component({
  selector: 'app-call-list',
  templateUrl: './call-list.component.html',
  styleUrls: ['./call-list.component.css']
})


export class CallListComponent implements OnInit {
   
   displayedColumns:any;
    dataSource:any;
    selection:any;
     formGroup: FormGroup;
    callTypeId:FormControl;
  dateSold:FormControl;
  ToSold:FormControl;
  customerStatus:FormControl;
isButtonEnable:boolean;
callTypes: CallType[] = [
    {value: 'Sales', viewValue: 'Sales'},
    {value: 'Service', viewValue: 'Service'}
  ];

    status: Status[] = [
    {value: 'NEW', viewValue: 'NEW'},
    {value: 'IN USE', viewValue: 'IN USE'},
    {value: 'COMPLETED', viewValue: 'COMPLETED'}
  ];



  constructor(private http: HttpClient,private router:Router,private formBuilder: FormBuilder) {
      this.createForm();
     
      
  }
    
     /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
      if(this.isAllSelected()){
              this.selection.clear();
              this.isButtonEnable = true;
          }else{
              this.dataSource.data.forEach(row => this.selection.select(row));
              this.isButtonEnable = false;
      }

  }
    
   
   
     createForm(){
        this.callTypeId = this.formBuilder.control('',[Validators.required]);
         this.dateSold = this.formBuilder.control('',[Validators.required]);
         this.ToSold = this.formBuilder.control('',[Validators.required]);
         this.customerStatus = this.formBuilder.control('',[Validators.required]);
       this.formGroup = this.formBuilder.group({
         callTypeId: this.callTypeId,
         dateSold: this.dateSold,
         ToSold: this.ToSold,
         customerStatus: this.customerStatus
    });
    }
     customers= [];
    
   
    fetchData = function(){
        this.http.get("http://localhost:4201/customerData").subscribe(
            (data) => { 
                this.customers = data;
                this.displayedColumns = ['select','title', 'dateSold', 'status'];
                this.dataSource = new MatTableDataSource<Element>(this.customers);
               this.selection = new SelectionModel<Element>(false, []);
    
            }
        );
    }

    selectedCustomerData(){
        /** NAVIGATING TO NEXT PAGE - Detail Call List  **/
        var customerId = this.selection.selected;
        if(customerId.length > 0){
            let url: string = "/detailList/" + customerId[0].id;
            this.router.navigate([url]);
        }
       
    }
    
    searchData(){
        /*** IF CallTypeID is empty **/
        if(this.callTypeId.value == "" && this.dateSold.value == "" && this.ToSold.value == "" && this.customerStatus.value == "" ){
            return false;
        } else  {
             /*** IF CallTypeID is not empty **/
            if(this.callTypeId.value != "" && ( this.dateSold.value == "" && this.ToSold.value == "" && this.customerStatus.value == "")){
                
                let customers = [];
               this.customers.filter((customer) => {
                    if(customer.callType == this.callTypeId.value){
                        customers.push(customer);
                         this.displayedColumns = ['select','title', 'dateSold', 'status'];
                        this.dataSource = new MatTableDataSource<Element>(customers);
                    }
                    
               }
                
                )
            }
            /*** IF customerStatus is not empty **/
            if(this.customerStatus.value != "" && ( this.dateSold.value == "" && this.ToSold.value == "" && this.callTypeId.value == "")){
                let customers = [];
               this.customers.filter((customer) => {
                    if(customer.status == this.customerStatus.value){
                        customers.push(customer);
                         this.displayedColumns = ['select','title', 'dateSold', 'status'];
                        this.dataSource = new MatTableDataSource<Element>(customers);
                    }
                    
               }
                
                )
            }
            /** IF CustomerStatus and CallType ID is not empty **/
            if(this.customerStatus.value != "" && this.callTypeId.value != ""){
                console.log(this.customerStatus.value);
                console.log(this.callTypeId.value);
                let customers = [];
                var flag  =  false;
               this.customers.filter((customer) => {
                    if((customer.status == this.customerStatus.value) && (customer.callType == this.callTypeId.value)){
                        customers.push(customer);
                         this.displayedColumns = ['select','title', 'dateSold', 'status'];
                        this.dataSource = new MatTableDataSource<Element>(customers);
                        flag = true;
                    } 
                    
               } )         
                if(flag == false){
                   alert('No Data Found');
                    customers = [];
                    this.dataSource = new MatTableDataSource<Element>(customers);
               }
                
               
            }
            
                  } 
        
    }

  ngOnInit() {
      this.fetchData();
     
  }  
   

}
