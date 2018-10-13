import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Problem } from '../../models/problem.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-problem-detail',
  templateUrl: './problem-detail.component.html',
  styleUrls: ['./problem-detail.component.css']
})
export class ProblemDetailComponent implements OnInit {
	problem: Problem;

  constructor(private dataService: DataService,
  	private route: ActivatedRoute) { }

  ngOnInit() {
  	this.route.params.subscribe(params => {
      // getProblem(id) returns a Promise
      this.dataService.getProblem(+params['id'])
        .then(problem => this.problem = problem);
        //getProblem return a promise.
        //problem is the returned data source. 
        //this.problem is your local problem.
      }) 
  }
}
