import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Exercise} from '../exercise.model';
import {TrainingService} from '../training.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit,AfterViewInit , OnDestroy{

  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;
  finishedExercisesSubscription : Subscription;

  displayedColumns: string[] = ['date','name','duration','calories','state'];
  dataSource : MatTableDataSource<Exercise> = new MatTableDataSource();

  constructor(private trainingService:TrainingService) { }

  ngOnInit(): void {
    this.finishedExercisesSubscription = this.trainingService.finishedExercisesChanged.subscribe((exercises : Exercise[])=>{
      this.dataSource.data = exercises;
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
  ngOnDestroy() {
    this.finishedExercisesSubscription.unsubscribe();
  }
}
