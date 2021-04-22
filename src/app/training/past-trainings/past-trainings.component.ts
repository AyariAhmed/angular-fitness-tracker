import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Exercise} from '../exercise.model';
import {TrainingService} from '../training.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import * as fromTraining from '../training.reducer';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit{

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource: MatTableDataSource<Exercise> = new MatTableDataSource();

  constructor(private trainingService: TrainingService,private store : Store<fromTraining.State>) {
  }

  ngOnInit(): void {
    this.store.select(fromTraining.getFinishedTrainings).subscribe(pastTrainings =>{
      this.dataSource.data = pastTrainings;
    });
    this.trainingService.FetchPastExercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

}
