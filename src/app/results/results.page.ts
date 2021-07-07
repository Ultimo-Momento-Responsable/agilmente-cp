import { Component, OnInit } from '@angular/core';
import { ResultsApiService } from './services/results-api.service';
import { Router } from '@angular/router';

export interface Result {
    id: number,
    name: string,
    patient: string,
    successes: number,
    mistakes: number,
    timeBetweenSuccesses: number[],
    date: string,
    totalTime: number,
    canceled: boolean
}

@Component({
    selector: 'app-results',
    templateUrl: './results.page.html',
    styleUrls: ['./results.page.scss'],
})

export class ResultsPage implements OnInit {

    results: any[];
    constructor(private resultsApiService: ResultsApiService, private router: Router) { }
    
    ngOnInit() { }

    goToSubresults(id) {
        this.router.navigate(['/subresults', id]);
    }

    ionViewWillEnter() {
        this.resultsApiService.getResults().subscribe(res => {
            this.results = res.content;
        });
    }

}
