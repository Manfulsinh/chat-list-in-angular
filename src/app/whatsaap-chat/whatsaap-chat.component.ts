import { Component } from '@angular/core';

@Component({
  selector: 'app-whatsaap-chat',
  templateUrl: './whatsaap-chat.component.html',
  styleUrls: ['./whatsaap-chat.component.css']
})


export class WhatsaapChatComponent {



    friends = [
      {
        imageUrl: 'assets/ms.jpeg',
        name: 'Manful',
        message: 'Hello, how are you?',
        time: '13:21'
      },

      {
        imageUrl: 'assets/ms.jpeg',
        name: 'Manful',
        message: 'Hello, how are you?',
        time: '13:21'
      },


      {
        imageUrl: 'assets/ms.jpeg',
        name: 'Manful',
        message: 'Hello, how are you?',
        time: '13:21'
      },

      {
        imageUrl: 'assets/ms.jpeg',
        name: 'Manful',
        message: 'Hello, how are you?',
        time: '13:21'
      },
    ];
  
    chatMessages: string[] = [];
    newMessage: string = '';
  
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        this.chatMessages.push(this.newMessage);
        this.newMessage = '';
      }
    }
  }