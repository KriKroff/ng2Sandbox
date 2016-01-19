import {Component} from 'angular2/core';
import {APP_DIRECTIVES} from '../config'
import {ElementRef} from "angular2/core";
import {Inject} from "angular2/core";
import {RouteParams} from "angular2/router"
import {CanActivate} from "angular2/router";
import {OnActivate} from "angular2/router";
import {ComponentInstruction} from "angular2/router";
import {Attribute, OnInit} from "angular2/core";

@Component({
    template: `
        {{now|date}}
        <h2>Manifestation {{codman |uppercase}}</h2>
    `,
    directives:[APP_DIRECTIVES]
})
export class ManifestationComponent implements OnActivate, OnInit{
    codman: string;
    now:Date = new Date;
    constructor(@Inject(ElementRef) elementRef: ElementRef, params:RouteParams) {
        this.codman=params.get('codman');
        console.log('Params',params.get('codman'));
    }

    ngOnInit():any {
        console.log('init');
        return undefined;
    }

    routerOnActivate(next:ComponentInstruction, prev:ComponentInstruction):any {
        next.params['extra']='OhYeah';
        console.log(next,prev);
        if (next.params['codman'] === 'TEST') {
            return true
        }
        return false;
    }

}
