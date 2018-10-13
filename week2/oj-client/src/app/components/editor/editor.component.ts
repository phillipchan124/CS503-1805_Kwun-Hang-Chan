import { Component, OnInit } from '@angular/core';
declare var ace: any; // we must declare ace, since the ace is not wroten by typescript, use type any.
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  editor: any;
  defaultContent = {
      'Java': `public class Example {
                      public static void main(String[] args) {
                        // Type your Java code here 
                    } 
       }
       `,
       'Python': `class Solution:
                def example():
                        # write your Python code here`
  };//use `` to write multi-line text

  constructor() { }

  ngOnInit() {
  	// "editor" is the id in html
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/eclipse");
    this.editor.getSession().setMode("ace/mode/java");
    // set the java
    this.editor.setValue(this.defaultContent["Java"]);
  }

}
