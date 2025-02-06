import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  // Add a single item to an array in local storage
  addToArray<T>(key: string, newItem: T): void {
    let existingArray: T[] = this.getArray<T>(key);
    existingArray.push(newItem);
    this.setItem(key, existingArray);
  }

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
