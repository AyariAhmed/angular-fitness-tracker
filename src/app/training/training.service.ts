import {Exercise} from './exercise.model';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable()
export class TrainingService {

  exerciseChanged: Subject<Exercise> = new Subject<Exercise>();

  private availableExercises: Exercise[] =[];
  exercisesChanged : Subject<Exercise[]> = new Subject<Exercise[]>();
  private runningExercise: Exercise;
  finishedExercisesChanged : Subject<Exercise[]> = new Subject<Exercise[]>();

  constructor(private db: AngularFirestore) {
  }

  fetchAvailableExercises() {
    this.db.collection('availableExercises').snapshotChanges()
      .pipe(map(docArray => {
        return  docArray.map(doc => {
          const data : Object = doc.payload.doc.data();
          return {id: doc.payload.doc.id , ...data}});
      })).subscribe((exercises : Exercise[])=> {
      this.availableExercises = exercises;
      this.exercisesChanged.next(this.availableExercises.slice());
    });

  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id == selectedId);
    this.exerciseChanged.next(this.runningExercise);
  }

  getRunningExercise(): Exercise {
    return {...this.runningExercise};
  }

  completeExercise() {
    this.addDataToDatabase({...this.runningExercise, date: new Date(), state: 'completed'});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  FetchPastExercises() : void{
    this.db.collection('finishedExercises').valueChanges().subscribe((exercises : Exercise[])=>{
      this.finishedExercisesChanged.next(exercises);
    });
  }

  private addDataToDatabase(exercise : Exercise){
    this.db.collection('finishedExercises').add(exercise);
  }


}
