import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  lastID = 0
  data
  load:boolean = false
  end: boolean = false
  key: string
  val: string

  formG: FormGroup
  input: FormControl
  select: FormControl

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.formG = new FormGroup({
      input: new FormControl(this.val),
      select: new FormControl(this.key)
    })
  }

  onSubmit(val){
    this.key = val.select
    this.val = val.input
    this.lastID = 0
    this.http.get('http://localhost:3002/admin/user/getUser/' + this.key + '/' + this.val + '/' + this.lastID).subscribe(res => {
        this.data = res
        this.load = true
        this.lastID = this.data[this.data.length - 1] ? this.data[this.data.length - 1]._id : 0
    })
  }

  @HostListener('window:scroll', ['$event']) onScroll(event) {
    if (this.load) {
      if (document.scrollingElement.scrollTop + window.innerHeight >= document.getElementById('listUsers').lastElementChild.offsetTop) {
        this.load = false
        this.http.get('http://localhost:3002/admin/user/getUser/' + this.key + '/' + this.val + '/' + this.lastID).subscribe(res => {
          if (res[0]) {
            this.data = this.data.concat(res)
            this.load = true
            this.lastID = this.data[this.data.length - 1] ? this.data[this.data.length - 1]._id : 0
            console.log(this.data)
          } else {
            this.end = true
            this.load = false
          }
        })
      }
    }
  }
}
