import { BetterManagerService, BetterScrollCore } from 'iwe7-better-scroll';
import { Directive, Input, ElementRef } from '@angular/core';

@Directive({ selector: '[scrollToMe]' })
export class ScrollToMeDirective {
    @Input() scrollId: string;
    @Input() scrollToMe: boolean;
    constructor(
        public scroll: BetterManagerService,
        public ele: ElementRef
    ) { }

    ngAfterViewInit() {
        if (this.scrollId) {
            if (this.scrollToMe) {
                const scroll: BetterScrollCore = this.scroll.get(this.scrollId);
                setTimeout(() => {
                    scroll.scrollToElement(this.ele.nativeElement, 300);
                }, 500);
            }
        }
    }
}
