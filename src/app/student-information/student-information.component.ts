import { Component, OnInit,Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { Student } from '../student';
import { ApiService } from '../services/api.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { ToastrService } from 'ngx-toastr';
import { faTrash,faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-student-information',
  templateUrl: './student-information.component.html',
  styleUrls: ['./student-information.component.css']
})
export class StudentInformationComponent implements OnInit,OnChanges {

  closeResult: string;
  student=new Student()
  faTrash=faTrash
  faPlus=faPlus
  gender:string
  constructor(  
    public service:ApiService,
    private ref:ChangeDetectorRef,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { 
    // console.log(this.service.students)
    
  }

  ngOnInit(): void {
    
  }
  ngOnChanges(){
    // console.log(this.service.students)
  }


  //delete student
  delete(student:Student){
    // console.log(student)
    for(let i in this.service.students){
      if(this.service.students[i].id==student.id){
        // console.log(i)
        this.service.students.splice(Number(i),1)
        this.ref.detectChanges()
        this.toastr.warning(`${student.name} deleted from record`,'deleted',{closeButton:true})
        break;
      }
    }
  }


 // for popup control 
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      (result) => {
      this.closeResult = `Closed with: ${result}`;
    },
     (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    }
    );
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    }
    
    //add new student
    else if(reason === 'add click'){
      
      this.student.id=uuidv4()
      if (this.gender=="false") {
        this.student.isMale=false
      }else{
        this.student.isMale=true
      }
      this.service.students.push(this.student)
      this.toastr.success(`successfully added one student`,'Added',{closeButton:true})
      this.ref.detectChanges()
    }

    else if(reason=='Cross click'){
      return `by${reason}`
    }
  }

  update(student:Student){

    for(let i in this.service.students){
      if(this.service.students[i].id==student.id){
        // console.log(i)
        if (this.gender=='false') {
          student.isMale=false
        }else{
          student.isMale=true
        }
        this.service.students[i]=student
        this.toastr.info(`successfully Updated one student`,'Added',{closeButton:true})
        this.ref.detectChanges()
        break;
      }
    }
    this.modalService.dismissAll()
  }



}


