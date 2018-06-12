import { Directive, Input, EventEmitter, Output, AfterViewInit } from '@angular/core';

@Directive({ selector: '[ngForEnd]' })
export class NgForEndDirective implements AfterViewInit {
    @Input() ngForEnd: boolean;
    @Output() ngForEnded: EventEmitter<boolean> = new EventEmitter();
    constructor() { }
    ngAfterViewInit() {
        if (this.ngForEnd) {
            this.ngForEnded.emit(this.ngForEnd);
        }
    }
}
