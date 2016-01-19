import {Directive} from "angular2/core";
import {ElementRef} from "angular2/core";
import {Renderer} from "angular2/core";
import {Input} from "angular2/core";

@Directive({
    selector:"p",
    host: {
        '(mouseenter)':'onMouseEnter()',
        '(mouseleave)': 'onMouseLeave()',
        '(click)':'click()'
    }
})
export class HighlightDirective {
    highLightColor: string = 'red';
    constructor(private el: ElementRef, private renderer:Renderer) {
        console.log('got',this.el);
    }

    onMouseEnter() {
        this._highlight(this.highLightColor);
    }

    onMouseLeave() { this._highlight(null); }

    click() {
        this.renderer.setElementStyle(this.el.nativeElement,'fontWeight',this.el.nativeElement.style.fontWeight === 'bold' ? '':'bold');
    }

    private _highlight(color:string) {
        this.renderer.setElementStyle(this.el.nativeElement,'backgroundColor', color);
    }
}