import {Subject} from 'rxjs';

export class UiService{
  loadingStateChanged : Subject<boolean> = new Subject();
 }
