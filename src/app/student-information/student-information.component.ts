import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Student } from '../student';
import { ApiService } from '../services/api.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { ToastrService } from 'ngx-toastr';
import { faTrash,faPlus,faMale,faFemale } from '@fortawesome/free-solid-svg-icons';

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
    public service:ApiService,
    private ref:ChangeDetectorRef,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { 

    
  }

  ngOnInit(): void {
    
  }

 // for popup control 
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      (result) => {
      this.closeResult = `Closed with: ${result}`;
    },
     (reason) => {
      this.closeResult = `Dismissed ${reason}`;
    }
    );
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    }
    
    else if(reason=='Cross click'){
      return `by${reason}`
    }
  }

  

//add a New a Student
  addNewStudent(){
    this.student.id=uuidv4()
    this.student.isMale=this.getGender(this.gender)
      if (this.student.age<=10) {
        this.lowAge=true
        return
      }
      this.service.students.push(this.student)
      this.toastr.success(`successfully added one student`,'Added',{closeButton:true})
      this.ref.detectChanges()
      this.student= new Student();
      this.modalService.dismissAll()
  }


  ///update student
  updateStudentDetails(student:Student){

    for(let i in this.service.students){
      if(this.service.students[i].id==student.id){

        student.isMale=this.getGender(this.gender)
        if (student.age<=10) {
          this.lowAge=true
          
          return
        }
        this.service.students[i]=student
        this.toastr.info(`successfully Updated one student`,'Added',{closeButton:true})
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
          this.toastr.warning(`${student.name} deleted from record`,'deleted',{closeButton:true})
          break;
        }
      }
    }

    getGender(gender):boolean{
      if (gender=='female') 
        return false;
      return true;  

    }


}


