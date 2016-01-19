/// <reference path="../../typings/lodash/lodash.d.ts" />
import {Component} from "angular2/core";
import {RouteConfig} from "angular2/router";
import * as _ from 'lodash'
import {CalendarYearsComponent} from "./calendarYears.component";
import {CalendarYearComponent} from "./calendarYear.component";
import {CalendarMonthComponent} from "./calendarMonth.component";

@Component({
    template: `
    <div class='calendar col-xs-5'>
          {{currentDate | date | uppercase }}
         <router-outlet></router-outlet>
    </div>
    `
})

@RouteConfig([
       { path: '/', name:'Years', component:CalendarYearsComponent, useAsDefault:true},
       { path: '/year/:year', name:'Year', component:CalendarYearComponent},
        { path: '/year/:year/month/:month', name:'Month', component:CalendarMonthComponent}

])
export class CalendarComponent {
    currentDate:Date = new Date();
    constructor() {
    }
}