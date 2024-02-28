import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Chat } from 'src/app/model/chatmodel';
import { ChatResponse } from 'src/app/model/response';
import { AuthService } from 'src/app/service/auth.service';
import { BotApiService } from 'src/app/service/bot-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {constructor(private botService: BotApiService, private authService:AuthService) {
  this.authService.gotoAuthorizedPages();
}

title = 'vj-chat-bot';
userInput = new FormControl('', [Validators.required]);
messages: Chat[] = [];
isProgressShown = false;
sessionId = generateSessionId(20);

addUserMessage() {
  var message = this.userInput.value;
  if (message != null && message != '') {
    var time = Date.now();
    this.messages.push({
      message: message,
      time: time,
      isUser: true,
    });
    setTimeout(() => {
      let element = document.getElementById('id-' + time);
      if (element != null) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
    this.requestResponseFromChatBot(message, this.sessionId);
  }
  this.userInput.patchValue('');
}

requestResponseFromChatBot(message: string, sessionId: string) {
  this.isProgressShown = true;
  this.botService
    .GetBotResponse({ message: message, sessionId: sessionId })
    .subscribe(
      (res: ChatResponse) => {
        var time = Date.now();
        this.messages.push({
          message: res.response,
          time: time,
          isUser: false,
        });

        setTimeout(() => {
          let element = document.getElementById('id-' + time);
          if (element != null) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
          this.isProgressShown = false;
        }, 100);
      },
      (err) => {
        console.log('err', err);
        this.isProgressShown = false;
      }
    );
}
}

function generateSessionId(length: number) {
let result = '';
const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charactersLength = characters.length;
let counter = 0;
while (counter < length) {
  result += characters.charAt(Math.floor(Math.random() * charactersLength));
  counter += 1;
}
return result;

}