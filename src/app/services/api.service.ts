import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../student';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  students:Student[]
  constructor(
    private http:HttpClient
  ) {
    this.http.get<Student[]>(`https://gsmktg.azurewebsites.net/api/v1/techlabs/test/students`).subscribe(students=>{
      this.students=students
      // console.log(this.students)
    })
   }

  apiCall(){
    return this.http.get(`https://gsmktg.azurewebsites.net/api/v1/techlabs/test/students`)
  }
  getstudents(){
    return this.students
  }

}
