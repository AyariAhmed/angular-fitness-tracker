import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingService} from '../training.service';
import {Exercise} from '../exercise.model';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {UiService} from '../../shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercises: Exercise[] = [];
  exercisesSubscription: Subscription;
  isLoading: boolean = false;
  private loadingStateSubscription: Subscription;

  constructor(private trainingService: TrainingService, private uiService: UiService) {
  }

  ngOnInit(): void {
    this.loadingStateSubscription = this.uiService.loadingStateChanged.subscribe(state => this.isLoading = state);

    this.exercisesSubscription = this.trainingService.exercisesChanged.subscribe(ex => this.exercises = ex);
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(f: NgForm) {
    this.trainingService.startExercise(f.form.value.exercise);
  }

  ngOnDestroy() {
    if (this.loadingStateSubscription) {
      this.loadingStateSubscription.unsubscribe();
    }
    if (this.exercisesSubscription) {
      this.exercisesSubscription.unsubscribe();
    }
  }

}
