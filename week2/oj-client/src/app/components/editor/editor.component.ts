import { Component, OnInit } from '@angular/core';
import { CollaborationService } from '../../services/collaboration.service';
import { ActivatedRoute, Params } from '@angular/router';

declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {
	editor: any;
  sessionId: string;

  public languages: string[]  = ['Java', 'Python'];
  language: string = 'Java'; //default language

	defaultContent = {
	   'Java': `public class Example {
                public static void main(String[] args) {
                   // Type your Java code here
                }
              }`,
     'Python': `class Solution:
                   def example():
                   # write your Python code here`
 };//use `` to write multi-line text
 
 constructor(private collaboration: CollaborationService,
             private route: ActivatedRoute) {}

 // ngOnInit() {
 //    // "editor" is the id in html
 //    this.editor = ace.edit("editor");
 //    this.editor.setTheme("ace/theme/eclipse");
 //    this.resetEditor();
 //    this.collaboration.init();
 // }

 ngOnInit() {
   // use problem id as session id
   // since we subscribe the changes, every time the params changes
   // sessionId will be updated and the editor will be initilized
   this.route.params.subscribe(
                params => {
                       this.sessionId = params['id'];
                       this.initEditor();
                });
 }

 initEditor(): void {
   this.editor = ace.edit("editor");
   this.editor.setTheme("ace/theme/eclipse");
   this.resetEditor();
   document.getElementsByTagName('textarea')[0].focus();
   
   // set up collaboration socket
   this.collaboration.init(this.editor, this.sessionId);
   this.editor.lastAppliedChange = null;
   // registrer change callback
   this.editor.on('change', (e) => {
      console.log('editor changes: ' + JSON.stringify(e));

      // if the change is initiated from the current browser session
      // then send to the server
      if (this.editor.lastAppliedChange != e) {
        this.collaboration.change(JSON.stringify(e));
      }
    })
 }

 resetEditor(): void {
    this.editor.getSession().setMode("ace/mode/" + this.language.toLowerCase());
    this.editor.setValue(this.defaultContent[this.language]);
 }

 setLanguage(language: string): void {
    this.language = language;
    this.resetEditor();
 }
 submit(): void {
    let usercode = this.editor.getValue();
    console.log(usercode);
 }
}
