import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit {
  dataSource: any;

  constructor() { }

  ngOnInit(): void {
  }

}
