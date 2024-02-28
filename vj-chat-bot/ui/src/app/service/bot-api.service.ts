import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChatResponse } from '../model/response';

@Injectable({
  providedIn: 'root',
})
export class BotApiService {
  constructor(private http: HttpClient) {}

  GetBotResponse(req: { message: string; sessionId: string }) {
    return this.http.post<ChatResponse>('http://localhost:5000/', req);
  }
}
