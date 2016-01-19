/// <reference path="../../typings/lodash/lodash.d.ts" />
import {Component} from "angular2/core";
import {RouteParams, Router, RouteConfig} from "angular2/router";
import * as _ from 'lodash'
import {CalendarYearComponent} from "./calendarYear.component";

@Component({
    template: `
    <div class="row">
        <div class="col-xs-1" ><a class="btn btn-default b" (click)="prev()">Prev</a></div>
        <div class='calendar col-xs-10'>
            <div class="row">
                <div class="row" *ngFor="#chunk of yearsChunked">
                 <div *ngFor="#year of chunk" class="col-xs-4 text-center" style="padding:5px;">
                    <a (click)="selectYear(year)" [class.btn-success]="lastYear == year" class="btn btn-primary">{{year}}</a>
                 </div>
                </div>
            </div>
        </div>
        <div class="col-xs-1" ><a class="btn btn-default" (click)="next()">Next</a></div>
    </div>
    `
})
export class CalendarYearsComponent {
    currentYear: number;
    lastYear: number;
    years: Array<number>;
    yearsChunked: Array<Array<number>>;


    constructor(routeParams: RouteParams, private _router:Router) {
        if (routeParams.get('year')) {
            this.lastYear = +routeParams.get('year');
        }
        let currentDate = new Date();
        this.currentYear = currentDate.getFullYear();

        this.refreshDate();
    }
    private refreshDate() {
        this.years = new Array();
        for (let i=this.currentYear -10; i<this.currentYear+10;i++) {
            this.years.push(i);
        }
        this.yearsChunked = _.chunk(this.years,3);
    }

    selectYear(year: number) {
        this._router.navigate(['Year', { year: year }]);
    }

    prev() {
        this.currentYear -= 20;
        this.refreshDate();
    }
    next() {
        this.currentYear += 20;
        this.refreshDate();
    }
}