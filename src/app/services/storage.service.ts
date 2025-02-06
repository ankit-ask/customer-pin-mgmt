import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private customersSubject = new BehaviorSubject<any[]>(
    this.getArray('customers')
  );
  private pinsSubject = new BehaviorSubject<any[]>(this.getArray('pins'));

  customers$ = this.customersSubject.asObservable();
  pins$ = this.pinsSubject.asObservable();

  // Add a single item to an array in local storage
  addToArray<T>(key: string, newItem: T): void {
    let existingArray: T[] = this.getArray<T>(key);
    const updatedArray = [...existingArray, newItem];
    this.setItem(key, updatedArray);

    if (key === 'customers') {
      this.customersSubject.next(updatedArray);
    } else if (key === 'pins') {
      this.pinsSubject.next(updatedArray);
    }
  }
  // addToArray<T>(key: string, newItem: T): void {
  //   let existingArray: T[] = this.getArray<T>(key);
  //   existingArray.push(newItem);
  //   this.setItem(key, existingArray);
  // }

  // Set item in local storage
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Get item from local storage
  getItem<T>(key: string): T | null {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  // Retrieve array
  getArray<T>(key: string): T[] {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  }

  // Remove item from local storage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Clear all local storage
  clear(): void {
    localStorage.clear();
  }
}
