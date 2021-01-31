import { Component, OnInit } from '@angular/core';
import {SharedService} from './../../../app/shared.service';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {
  ModalTitle:string;
  ActivateAddEditDepComp:boolean;
  dep:any;

  constructor(private shared:SharedService) { }

  DepartmentList:any[];
  DepartmentIdFilter:string="";
  DepartmnetNameFilter:string="";
  DepartmentListWithoutFilter:any=[];

  ngOnInit(): void {
    this.refreshDepList();
  }
  editClick(item){
    this.dep = item;
    this.ModalTitle = "Edit Department";
    this.ActivateAddEditDepComp = true;
  }
  addClick(){
    this.dep={
      DepartmentId:0,
      DepartmentName:""
    }
    this.ModalTitle ="Add Department";
    this.ActivateAddEditDepComp = true;
  }

  deleteClick(item){
    if(confirm('Are you sure??')){
      this.shared.deleteDepartment(item.DepartmentId).subscribe(data=>{
        alert(data.toString());
        this.refreshDepList();
      })
    } 

  }
  closeClick(){
    this.ActivateAddEditDepComp = false;
    this.refreshDepList();
  }

  refreshDepList(){
    this.shared.getDepList().subscribe(data=>{
          this.DepartmentList =data;
          this.DepartmentListWithoutFilter =data;
    });
  }

  FilterFn(){
    var DepartmentIdFilter = this.DepartmentIdFilter;
    var DepartmnetNameFilter = this.DepartmnetNameFilter;

    this.DepartmentList = this.DepartmentListWithoutFilter.filter(function(el){
      return el.DepartmentId.toString().toLowerCase().includes(
        DepartmentIdFilter.toString().trim().toLowerCase()
      )&&
      el.DepartmentName.toString().toLowerCase().includes(
        DepartmnetNameFilter.toString().trim().toLowerCase()
      )
    })
  }

  sortResult(prop,asc){
    this.DepartmentList = this.DepartmentListWithoutFilter.sort(function(a,b){
      if(asc){
        return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
      }
    })
  }
}
