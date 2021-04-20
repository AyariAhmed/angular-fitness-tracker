import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingService} from '../training.service';
import {Exercise} from '../exercise.model';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercises: Exercise[] = [];
  exercisesSubscription: Subscription;

  constructor(private trainingService: TrainingService) {
  }

  ngOnInit(): void {
    this.exercisesSubscription = this.trainingService.exercisesChanged.subscribe(ex => this.exercises = ex);
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(f: NgForm) {
    this.trainingService.startExercise(f.form.value.exercise);
  }

  ngOnDestroy() {
    this.exercisesSubscription.unsubscribe();
  }

}
