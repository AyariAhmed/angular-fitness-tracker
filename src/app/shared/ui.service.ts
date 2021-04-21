import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class UiService{
  loadingStateChanged : Subject<boolean> = new Subject();

  constructor(private snackBar: MatSnackBar) {
  }

  openSnackBar(message : string) : void{
    this.snackBar.open(message,'Dismiss',{
      duration : 8000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }
 }
