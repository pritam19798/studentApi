import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Student } from '../student';
import { StudentApiService } from '../services/student-api.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { ToastrService } from 'ngx-toastr';
import { faTrash,faPlus,faMale,faFemale } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-student-information',
  templateUrl: './student-information.component.html',
  styleUrls: ['./student-information.component.css']
})
export class StudentInformationComponent implements OnInit {


  closeResult: string;
  student=new Student()
  faTrash=faTrash
  faPlus=faPlus
  faMale=faMale
  faFemale=faFemale
  gender:string
  lowAge=false
  constructor(
    public service:StudentApiService,
    private ref:ChangeDetectorRef,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {


  }

  ngOnInit(): void {

  }

 // for popup controlUpdate
 openUpdate(content,student:Student) {
  this.lowAge=false
    this.gender=this.getGender(student.isMale)
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      (result) => {
      this.closeResult = `Closed with: ${result}`;
    },
     (reason) => {
      this.closeResult = `Dismissed ${reason}`;
    }
    );
  }

   // for popup control Add Student
  openAddStudent(content) {
    this.student= new Student();
    this.gender=''
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      (result) => {
      this.closeResult = `Closed with: ${result}`;
    },
     (reason) => {
      this.closeResult = `Dismissed ${reason}`;
    }
    );
  }





//add a New a Student
  addNewStudent(){
    this.student.id=uuidv4()
    this.student.isMale=this.getIsMale(this.gender)
      if (this.student.age<=10) {
        this.lowAge=true
        return
      }
      this.service.students.push(this.student)
      this.toastr.success(`Successfully added one student`,'Added',{closeButton:true,positionClass:'toast-bottom-right'})
      this.ref.detectChanges()
      this.student= new Student();
      this.modalService.dismissAll()
  }


  ///update student
  updateStudentDetails(student:Student){

    for(let i in this.service.students){
      if(this.service.students[i].id==student.id){

        student.isMale=this.getIsMale(this.gender)

        if (student.age<=10) {
          this.lowAge=true

          return
        }
        this.service.students[i]=student
        this.toastr.info(`Successfully updated one student`,'Updated',{closeButton:true})
        this.ref.detectChanges()
        break;
      }
    }
    this.modalService.dismissAll()
  }

    //delete student
    deleteStudent(student:Student){

      for(let i in this.service.students){
        if(this.service.students[i].id==student.id){
          this.service.students.splice(Number(i),1)
          this.ref.detectChanges()
          this.toastr.warning(`${student.name} deleted from record`,'Deleted',{closeButton:true,positionClass:'toast-bottom-right'})
          break;
        }
      }
    }

    getIsMale(gender):boolean{
      if (gender=='female')
        return false;
      return true;

    }

    getGender(isMale:boolean){
      if(isMale)
        return "male"
      return "female"
    }



}


