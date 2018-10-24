import { Injectable } from '@angular/core';

declare var io: any; // io is alread imported in .angular.cli.json

@Injectable({
  providedIn: 'root'
})
export class CollaborationService {
  collaborationSocket: any;
  constructor() { }

  init(editor: any, sessionId: string): void {
    // window.location.origin: the server location on the current page
    // for example, the current page on the browser is "localhost:3000/problems/1", the window.location.origin = "http/localhost:3000"
    //this.collaborationSocket = io(window.location.origin, { query: 'message=haha' });
    
    // take two parameters
    this.collaborationSocket = io(window.location.origin, {query:'sessionId=' + sessionId});
    // wait for 'message' event
    // when receive the message, for now just print the message
    // this.collaborationSocket.on("message", (message) => {
    //   console.log('message received from the server: ' + message);
    // })

    // when receive change from the server, apply to local browser session
  	this.collaborationSocket.on('change', (delta: string) => {
  		console.log('collaboration: editor changes ' + delta);
  		delta = JSON.parse(delta);
  		editor.lastAppliedChange = delta;
  		editor.getSession().getDocument().applyDeltas([delta]);
  	});
  }

  // send to server (which will forward to other participants)
  change(delta: string): void {
  	console.log('send message' + delta);
  	this.collaborationSocket.emit('change', delta);
  }

  // restore buffer from redis cache
  restoreBuffer(): void {
    this.collaborationSocket.emit("restoreBuffer");
  }
}
