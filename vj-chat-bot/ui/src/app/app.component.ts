import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Chat } from './model/chatmodel';
import { SessionsClient } from '@google-cloud/dialogflow';
import { BotApiService } from './service/bot-api.service';
import { ChatResponse } from './model/response';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  
}