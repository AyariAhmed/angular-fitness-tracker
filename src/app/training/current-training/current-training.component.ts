import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {StopTrainingComponent} from './stop-training.component';
import {TrainingService} from '../training.service';
import * as fromTraining from '../training.reducer';
import {Store} from '@ngrx/store';
import {getActiveTraining} from '../training.reducer';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {

  progress : number = 0;
  timer : number ;


  constructor( private dialog : MatDialog,private trainingService:TrainingService,private store : Store<fromTraining.State>) {}

  ngOnInit(): void {
      this.startOrResumeTimer();
  }

  startOrResumeTimer() : void{
    this.store.select(fromTraining.getActiveTraining).subscribe(exercise =>{
      const step = exercise.duration / 100 * 1000;
      // @ts-ignore
      this.timer = setInterval(()=>{
        this.progress += 1;
        if(this.progress >= 100){
          this.trainingService.completeExercise();
          clearInterval(this.timer);
        }
      },step);
    });

  }

  stop() : void {
    clearInterval(this.timer);
    this.store.select(getActiveTraining).subscribe(exercise => {
      const dialogRef =  this.dialog.open(StopTrainingComponent,{data :{progress : this.progress,name : exercise.name}});
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.trainingService.cancelExercise(this.progress);
        }else {
          this.startOrResumeTimer();
        }
      })
    });

  }


}
