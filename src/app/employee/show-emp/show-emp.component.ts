import { Component, OnInit } from '@angular/core';
import {SharedService} from './../../../app/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  ModalTitle:string;
  ActivateAddEditEmpComp:boolean;
  emp:any;

  constructor(private shared:SharedService) { }

  EmployeeList:any[];

  ngOnInit(): void {
    this.refreshEmpList();
  }
  editClick(item){
    this.emp = item;
    this.ModalTitle = "Edit Employee";
    this.ActivateAddEditEmpComp = true;
  }
  addClick(){
    this.emp={
      EmployeeId:0,
      EmployeeName:"",
      Department:"",
      DateOfJoining:"",
      PhotoFileName:"anonymous.png "
    }
    this.ModalTitle ="Add Employee";
    this.ActivateAddEditEmpComp = true;
  }

  deleteClick(item){
    if(confirm('Are you sure??')){
      this.shared.deleteEmployee(item.EmployeeId).subscribe(data=>{
        alert(data.toString());
        this.refreshEmpList();
      })
    } 

  }
  closeClick(){
    this.ActivateAddEditEmpComp = false;
    this.refreshEmpList();
  }

  refreshEmpList(){
    this.shared.getEmpList().subscribe(data=>{
          this.EmployeeList =data;
    });
  }
}
