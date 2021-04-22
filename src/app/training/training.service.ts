import {Exercise} from './exercise.model';
import {map, take} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Subscription} from 'rxjs';
import {UiService} from '../shared/ui.service';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';
import * as fromTraining from './training.reducer';
import {Store} from '@ngrx/store';

@Injectable()
export class TrainingService {


  private fbSubs: Subscription[] = [];

  constructor(private db : AngularFirestore,
              private uiService :UiService,
              private store : Store<fromTraining.State>) {
  }

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(this.db.collection('availableExercises').snapshotChanges()
      .pipe(map(docArray => {
        return docArray.map(doc => {
          const data: Object = doc.payload.doc.data();
          return {id: doc.payload.doc.id, ...data};
        });
      })).subscribe((exercises: Exercise[]) => {
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new Training.SetAvailableTrainings(exercises));
      }, error => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.openSnackBar(error.message);
      }));

  }

  startExercise(selectedId: string) {
       this.store.dispatch(new Training.StartTraining(selectedId));
  }



  completeExercise() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(currTraining => {
      this.addDataToDatabase({...currTraining, date: new Date(), state: 'completed'});
      this.store.dispatch(new Training.StopTraining());
    })

  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(currTraining => {
      this.addDataToDatabase({
      ...currTraining,
      duration: currTraining.duration * (progress / 100),
      calories: currTraining.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.store.dispatch(new Training.StopTraining());
    });
  }

  FetchPastExercises(): void {
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
      this.store.dispatch(new UI.StopLoading());
      this.store.dispatch(new Training.SetFinishedTrainings(exercises));
    }, error => {
      this.store.dispatch(new UI.StopLoading());
      this.uiService.openSnackBar(error.message);
    }));
  }

  cancelSubscriptions(){
    this.fbSubs.forEach(sb => sb.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise).catch(error => {
      this.uiService.openSnackBar(error.message);
    });
  }


}
