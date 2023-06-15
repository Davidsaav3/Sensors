import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private sharedDataSubject = new BehaviorSubject<string>('Initial value');
  sharedData$ = this.sharedDataSubject.asObservable();

  updateSharedData(data: string) {
    this.sharedDataSubject.next(data);
  }
}
