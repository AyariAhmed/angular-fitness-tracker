import {Component, OnInit} from '@angular/core';
import {TrainingService} from '../training.service';
import {Exercise} from '../exercise.model';
import {NgForm} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {


  exercises: Observable<any>;

  constructor(private trainingService: TrainingService, private db: AngularFirestore) {
  }

  ngOnInit(): void {
    this.exercises =  this.db.collection('availableExercises').snapshotChanges()
      .pipe(map(docArray => {
      return  docArray.map(doc => {
        const data : Object = doc.payload.doc.data();
        return {id: doc.payload.doc.id , ...data}});
    }));

  }

  onStartTraining(f: NgForm) {
    this.trainingService.startExercise(f.form.value.exercise);
  }

}
