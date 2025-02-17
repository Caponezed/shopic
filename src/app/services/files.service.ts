import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BASE_URL } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  constructor(@Inject(BASE_URL) private baseUrl: string, private readonly httpClient: HttpClient) { }

  uploadFile(file: FormData) {
    return this.httpClient.post(`${this.baseUrl}/api/files`, file, { responseType: 'text' });
  }
}
