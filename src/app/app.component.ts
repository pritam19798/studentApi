import { Component, ChangeDetectorRef } from '@angular/core';
import { ApiService } from './services/api.service';
import { Student } from './student';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'studentApi';

  students:Student[]
  constructor(
    
    public service:ApiService,
    private ref:ChangeDetectorRef
  ){}

  handle(){
    // console.log('clicked')
    // this.service.apiCall().subscribe(students=>{
    //   this.students=students
    //   this.ref.detectChanges()
    // })

    this.students=this.service.students
    
  }


}
