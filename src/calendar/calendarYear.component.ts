/// <reference path="../../typings/lodash/lodash.d.ts" />
import {Component, OnInit} from "angular2/core";
import {RouteParams, Router, RouteConfig} from "angular2/router";
import * as _ from 'lodash'
import {APP_DIRECTIVES} from "../config";

@Component({
    template: `
    <div>
        <div class="row">
            <div class="col-xs-12 text-center"><a class="btn btn-default" (click)="back()">Back {{'toto'}}</a></div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <div class="row" *ngFor="#chunks of monthsChunked">
                    <div *ngFor="#month of chunks" class="col-xs-4 text-center" style="padding:5px;">
                      <a (click)="selectMonth(month)" class="btn btn-primary">{{ month | date:'MMM'}}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
})
export class CalendarYearComponent implements OnInit {

    months: Array<Date>;
    monthsChunked: Array<Array<Date>>;
    year: number;

    constructor(private routeParams: RouteParams, private _router:Router) {
    }

    ngOnInit():any {
        this.year = +this.routeParams.get('year');
        this.months = _.range(1,13,1).map((x) => { return new Date(x+'/01/'+this.year); });
        console.log(this.months);
        this.monthsChunked = _.chunk(this.months,3);
        return undefined;
    }

    selectMonth(month: Date) {
        this._router.navigate(['Month', { year:this.year, month: month.getMonth() }]);
    }

    back() {
        this._router.navigate(['Years', { year: this.year}])
    }

}