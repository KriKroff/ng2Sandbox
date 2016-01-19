/// <reference path="../../typings/lodash/lodash.d.ts" />
import {Component, OnInit} from "angular2/core";
import {RouteParams, Router, RouteConfig} from "angular2/router";
import * as _ from 'lodash'
import {APP_DIRECTIVES} from "../config";

@Component({
    template: `
    <div>
        <div class="row">
            <div class="col-xs-6 text-center"><a class="btn btn-default" (click)="back()">Back</a></div>
        </div>
        <div class="row">
            <div class="col-xs-6 text-center">
                {{currentDate | date:'MM/yyyy'}}
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <div class="row" >
                    <div *ngFor="#x of ['Mon','Tue','Wed','Thus','Fri','Sat','Sun']" class="col-xs-1 text-center" style="padding:5px;">
                        {{x}}
                    </div>
                </div>
                <div class="row" *ngFor="#chunks of daysChunked">
                    <div *ngFor="#day of chunks" class="col-xs-1 text-center" style="padding:5px;">
                        <a *ngIf="day" class="btn btn-primary">{{ day | date:'dd'}}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
})
export class CalendarMonthComponent implements OnInit {

    days: Array<Date>;
    daysChunked: Array<Array<Date>>;
    year: number;
    month:number;
    currentDate:Date;

    constructor(private routeParams: RouteParams, private _router:Router) {
    }

    ngOnInit():any {
        this.year = +this.routeParams.get('year');
        this.month = +this.routeParams.get('month');
        this.currentDate=new Date(this.year,this.month);
        this.days = _.range(1,new Date(this.year,this.month,1).getDay()).map(()=> null)
        let nbDays = new Date(this.year,this.month, 0).getDate() +1;
        this.days = this.days.concat(_.range(1,nbDays,1).map((x) => { return new Date(this.year,this.month,x); }));
        console.log(this.days);
        this.daysChunked = _.chunk(this.days,7);
        return undefined;
    }


    back() {
        this._router.navigate(['Year', { year: this.year}])
    }

}