import {Component,  OnInit} from '@angular/core';
import {TrainingService} from '../training.service';
import {Exercise} from '../exercise.model';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs';
import {UiService} from '../../shared/ui.service';
import * as fromTraining from '../training.reducer';
import * as fromRoot from '../../app.reducer';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit{

  exercises$: Observable<Exercise[] > ;
  isLoading$: Observable<boolean> ;

  constructor(private trainingService: TrainingService, private uiService: UiService,private store : Store<fromTraining.State>) {
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableTrainings);
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(f: NgForm) {
    this.trainingService.startExercise(f.form.value.exercise);
  }



}
