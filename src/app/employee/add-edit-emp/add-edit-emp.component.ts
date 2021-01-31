import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  constructor(private shared:SharedService) { }

  @Input() emp:any;
  EmployeeId:string;
  EmployeeName:string;
  Department:string;
  DateOfJoining:string;
  PhotoFileName:string;
  PhotoFilePath:string;

  DepartmentList:any=[];

  loadDepartmentList(){
    this.shared.getAllDepartmentNames().subscribe((data:any)=>{
          this.DepartmentList = data;

          this.EmployeeId = this.emp.EmployeeId;
          this.EmployeeName =   this.emp.EmployeeName;
          this.Department = this.emp.Department;
          this.DateOfJoining = this.emp.DateOfJoining;
          this.PhotoFileName = this.emp.PhotoFileName;
          this.PhotoFilePath = this.shared.photoUrl + this.PhotoFileName;
     });

  }

  ngOnInit(): void {
    this.loadDepartmentList();
  }

  addEmployee(){
    var val ={
      EmployeeId:this.EmployeeId,
      EmployeeName:this.EmployeeName,
      Department:this.Department,
      DateOfJoining:this.DateOfJoining,
      PhotoFileName:this.PhotoFileName
      
    };
    this.shared.addEmployee(val).subscribe(res=>{
      alert(res.toString());
    })
  }
  updateEmployee(){
    var val ={
      EmployeeId:this.EmployeeId,
      EmployeeName:this.EmployeeName,
      Department:this.Department,
      DateOfJoining:this.DateOfJoining,
      PhotoFileName:this.PhotoFileName
    };
    this.shared.updateEmployee(val).subscribe(res=>{
      alert(res.toString());
    })
  }
  
  uploadPhoto(event){
    var file = event.target.files[0];
    const formData:FormData= new FormData();
    formData.append('uploadedFile', file,file.name)

    this.shared.UploadPhoto(formData).subscribe((data:any)=>{
      this.PhotoFileName= data.toString();
      this.PhotoFilePath = this.shared.photoUrl + this.PhotoFileName;
    })
  }
 

}
