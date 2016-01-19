import {Component} from 'angular2/core';
import {HighlightDirective} from "./highlight.directive";
import {APP_DIRECTIVES} from './config'

@Component({
    template: `
        About me... Nothing
        <p>
        And this is how we do
        </p>
    `
})
export class AboutComponent {
    name: string = 'World';
}
