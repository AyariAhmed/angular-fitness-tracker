import {Action} from '@ngrx/store';
import {Exercise} from './exercise.model';

export const SET_AVAILABLE_TRAININGS='[TRAINING] SET_AVAILABLE_TRAININGS';
export const SET_FINISHED_TRAININGS='[TRAINING] SET_FINISHED_TRAININGS';
export const START_TRAINING='[TRAINING] START_TRAINING';
export const STOP_TRAINING='[TRAINING] STOP_TRAINING';

export class SetAvailableTrainings implements Action{
  readonly type = SET_AVAILABLE_TRAININGS;
  constructor(public payload : Exercise[]) {
  }
}
export class SetFinishedTrainings implements Action{
  readonly type = SET_FINISHED_TRAININGS;
  constructor(public payload : Exercise[]) {
  }
}
export class StopTraining implements Action{
  readonly type = STOP_TRAINING;
}
export class StartTraining implements Action{
  readonly type = START_TRAINING;
  constructor(public payload : string) {
  }
}

export type TrainingActions = SetAvailableTrainings | SetFinishedTrainings| StartTraining | StopTraining;

