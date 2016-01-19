import {Component, provide, Inject, ElementRef, PLATFORM_DIRECTIVES} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from "angular2/router";
import {APP_DIRECTIVES} from './config'
import {AboutComponent} from "./about";
import {ELEMENT_PROBE_PROVIDERS} from "angular2/src/platform/dom/debug/debug_element_view_listener";
import {ManifestationComponent} from "./manifestation/manifestation.component";
import {CalendarComponent} from "./calendar/calendar.component";

@Component({
    selector: 'reservation-app',
    template: `
        <div class="container-fluid">
            <nav>
                <a [routerLink]="['Manifestation',{codman:'TEST'}]">Show Manif</a>
                <a [routerLink]="['Calendar']">Calendrier</a>

             </nav>
            <h1>Hello, {{codman}}!</h1>
            <p>Ouais</p>
            <p>
                Say hello to: <input [value]="codman" (input)="codman = $event.target.value">
            </p>
            <div class="row">
                 <router-outlet></router-outlet>
            </div>
        </div>
    `
})
@RouteConfig([
    { path:"/manifestation/:codman",name:"Manifestation", component:ManifestationComponent },
    { path:"/calendar/...",name:"Calendar", component:CalendarComponent }
])
export class ReservationApp {
    private codman:string = 'BASE';
    constructor(_router:Router,  @Inject(ElementRef) elementRef:ElementRef) {
        //this.codman = appElt.nativeElement.getAttribute('codman');
        //this._router.navigate(['Manifestation', {codman: this.codman}]);
    }

}

bootstrap(ReservationApp, [ROUTER_PROVIDERS, provide(PLATFORM_DIRECTIVES, {useValue: APP_DIRECTIVES, multi:true}), provide(LocationStrategy, {useClass: HashLocationStrategy})]);