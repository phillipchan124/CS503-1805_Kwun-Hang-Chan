import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Problem } from '../../models/problem.model';
import { PROBLEMS } from '../../mock-problems';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit {
	problems: Problem[]
  subscriptionProblems: Subscription;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  	this.getProblem();
  }

  ngOnDestroy() {
    this.subscriptionProblems.unsubscribe();
  }


  getProblem() {
  	// this.problems = this.dataService.getProblems();
    this.subscriptionProblems = this.dataService.getProblems()
        .subscribe(problems => this.problems = problems);
  }

}
