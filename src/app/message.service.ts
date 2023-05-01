import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

// messagesおよび 2つのメソッドを
// 他のクラスから利用できるように公開
export class MessageService {
  constructor() {}

  messages: String[] = [];

  // 新たなメッセージを messages へ追加
  add(message: String) {
    this.messages.push(message);
  }

  // messages の値を初期化
  clear() {
    this.messages = [];
  }
}
