import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {

  progress : number = 0;
  constructor() { }

  ngOnInit(): void {
    const intervalId = setInterval(()=>{
      this.progress += 5;
    },200);
    setTimeout(()=>{
      clearInterval(intervalId);
    },4200);
  }


}
