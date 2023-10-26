import { Component, OnInit } from '@angular/core';




interface Message {
  id?: string;
  text: string;
  time: string;
  senderId?: string;  // <- Add this
  sender?: string;
  replyFromUserId?: string;
}



interface Group {
  imageUrl: string;
  name: string;
  messages: Message[];
  lastMessage: string;
  time: string;
  members: string[];
  id: string; 
}

interface User {
  id: string;
  name: string;
}
interface MessagePattern {
  pattern: RegExp;
  responses: string[];
}

interface MessagePattern {
  pattern: RegExp;
  responses: string[];
}

@Component({
  selector: 'app-whatsaap-chat',
  templateUrl: './whatsaap-chat.component.html',
  styleUrls: ['./whatsaap-chat.component.css']
})
export class WhatsaapChatComponent implements OnInit {
  currentChatGroup: Group | null = null;
  newMessage: Message = { text: '', time: '' };
 

  groups: Group[] = [
    {
      id: '1', 
      imageUrl: 'assets/ms.jpeg',
      name: 'Rao Information',
      messages: [
        { text: 'Hello family!', time: '12:55' },
        { text: 'Dinner at 8?', time: '13:10' }
      ],
      members: ['Parth', 'Keyur', 'Nirav'],
      lastMessage: 'Dinner at 8?',
      time: '13:21',
    
    },
    {
      id: '2', 
      imageUrl: 'assets/ms.jpeg',
      name: 'Friend Group',
      messages: [
        { text: 'Meeting at 5.', time: '11:30' },
        { text: 'Don\'t forget the presentation!', time: '12:30' }
      ],
      members: ['Parnav', 'Pravin', 'Jay'],
      lastMessage: 'Don\'t forget the presentation!',
      time: '12:45',
    
    },
    {
      id: '3', 
      imageUrl: 'assets/ms.jpeg',
      name: 'School Group',
      messages: [
        { text: 'Hello family!', time: '12:55' },
        { text: 'Dinner at 8?', time: '13:10' }
      ],
      members: ['jeel', 'Meet', 'Ravi'],
      lastMessage: 'Dinner at 8?',
      time: '13:21',

    },
    {
      id: '4', 
      imageUrl: 'assets/ms.jpeg',
      name: 'Rao Information Amhdabad',
      messages: [
        { text: 'Meeting at 5.', time: '11:30' },
        { text: 'Don\'t forget the presentation!', time: '12:30' }
      ],
      members: ['Rakesh', 'Vipul', 'Dhanraj'],
      lastMessage: 'Don\'t forget the presentation!',
      time: '12:45',
   
    }
  ];
  
 



  ngOnInit(): void {
    const sampleUser: User = { id: '1', name: 'Manful' };
    this.saveUserToLocalStorage(sampleUser);
}



saveChatToLocalStorage(group: Group, user: User): void {
  const chatData = {
    messages: group.messages,
    userId: user.id,
    name: user.name
  };
  localStorage.setItem(`chat_${group.id}`, JSON.stringify(chatData));
}


getChatFromLocalStorage(groupId: string): { messages: Message[], userId: string, name: string } | null {
  const chat = localStorage.getItem(`chat_${groupId}`);
  return chat ? JSON.parse(chat) : null;
}

getMessagesByUserIdAndName(userId: string, name: string): Message[] {
  let allMessages: Message[] = [];
  this.groups.forEach(group => {
    allMessages = allMessages.concat(group.messages);
  });

  return allMessages.filter(msg => msg.senderId === userId && msg.sender === name);
}


  
  saveUserToLocalStorage(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }


  getUserFromLocalStorage(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}


 

  getUserById(userId: string): User | null {
    const user: User | null = this.getUserFromLocalStorage();
    return user && user.id === userId ? user : null;
}


  generateUniqueId(): string {
    return new Date().toISOString();
  }

  openChat(group: Group): void {
    this.currentChatGroup = group;
  }


  
 
  sendMessage(): void {
    if (this.newMessage.text.trim() !== '' && this.currentChatGroup) {
      this.newMessage.time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      this.newMessage.id = this.generateUniqueId();
      this.currentChatGroup.messages.push(this.newMessage);
  
      let replyText = this.generateReply(this.newMessage.text);
  
      let randomMember: string;
      do {
        randomMember = this.currentChatGroup.members[Math.floor(Math.random() * this.currentChatGroup.members.length)];
      } while (randomMember === 'Manful');
  
      const replyMessage: Message = {
        text: replyText,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        id: this.generateUniqueId(),
        sender: randomMember 
      };
      this.currentChatGroup.messages.push(replyMessage);
  
  
      const user: User | null = this.getUserFromLocalStorage();
      if (user) {
        this.saveChatToLocalStorage(this.currentChatGroup, user);
      }
  
      this.newMessage = { text: '', time: '' };
    }
  }
  



private messagePatterns: MessagePattern[] = [
  {
    pattern: /hi|hello|hey/i,
    responses: ['Hello!', 'Hey there!', 'Hi!']
  },
  {
    pattern: /how are you/i,
    responses: ['I am good, thank you! How about you?', 'Doing great, thanks for asking!']
  },
  {
    pattern: /thank you|thanks/i,
    responses: ['You\'re welcome!', 'No problem!']
  },
  {
    pattern: /\?$/,
    responses: ['That\'s an interesting question. Let me think...', 'I might need some time to answer that.', 'Can you clarify that?']
  }
];

generateReply(inputText: string): string {
  for (let patternObj of this.messagePatterns) {
    if (patternObj.pattern.test(inputText)) {
 
      const randomIndex = Math.floor(Math.random() * patternObj.responses.length);
      return patternObj.responses[randomIndex];
    }
  }

  return 'Good Morning'; 
}



}
