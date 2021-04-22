import {SET_AVAILABLE_TRAININGS, SET_FINISHED_TRAININGS, START_TRAINING, STOP_TRAINING, TrainingActions} from './training.actions';
import {Exercise} from './exercise.model';
import * as fromRoot from '../app.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeTraining: Exercise
}

export interface State extends fromRoot.State {
  training: TrainingState
}

const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null
};

export function trainingReducer(state = initialState, action: TrainingActions): TrainingState {
  switch (action.type) {
    case SET_AVAILABLE_TRAININGS :
      return {
        ...state,
        availableExercises : action.payload
      };
    case SET_FINISHED_TRAININGS :
      return {
        ...state,
        finishedExercises : action.payload
      };
    case START_TRAINING: return {
      ...state,
      activeTraining : {...state.availableExercises.find(ex => ex.id == action.payload)}
    };
    case STOP_TRAINING : return {
      ...state,
      activeTraining : null
    }
    default :
      return state;
  }
}
export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getActiveTraining = createSelector (getTrainingState,(state: TrainingState) => state.activeTraining);
export const getIsTraining = createSelector (getTrainingState,(state: TrainingState) => state.activeTraining != null);
export const getAvailableTrainings = createSelector (getTrainingState,(state: TrainingState) => state.availableExercises);
export const getFinishedTrainings = createSelector (getTrainingState,(state: TrainingState) => state.finishedExercises);
