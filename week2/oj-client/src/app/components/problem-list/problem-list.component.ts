import { Component, OnInit, OnDestroy } from '@angular/core'; //unsubscribe when destroy to avoid memory leak
import { Problem } from '../../models/problem.model';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit, OnDestroy {
	problems: Problem[];
  subscriptionProblems: Subscription;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  	this.getProblem();
  }

  ngOnDestroy() {
    this.subscriptionProblems.unsubscribe();
  }

  getProblem() {
  	this.subscriptionProblems = this.dataService.getProblems()
    .subscribe(problems => this.problems = problems);
  }

}
