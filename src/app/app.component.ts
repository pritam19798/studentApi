import { Component, ChangeDetectorRef } from '@angular/core';
import { StudentApiService } from './services/student-api.service';
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

    public service:StudentApiService,
    private ref:ChangeDetectorRef
  ){}

  handle(){


    this.students=this.service.students

  }


}
