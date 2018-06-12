import { FormGroup, FormBuilder } from '@angular/forms';
import { LayoutOutletComponent } from 'iwe7-layout';
import { BetterScrollDirective } from 'iwe7-better-scroll';
import { HttpClient } from '@angular/common/http';
import { CustomComponent } from 'iwe7-core';
import { Component, ViewChild, Injector, ElementRef } from '@angular/core';
import { Iwe7Url2Service } from 'iwe7-url';
import { map, pluck } from 'rxjs/operators';
@Component({
    selector: 'car-type-select',
    templateUrl: 'car-type-select.html',
    styleUrls: ['./car-type-select.scss']
})
export class CarTypeSelectComponent extends CustomComponent<any> {
    brand: any;
    type: any;
    selectId: number = 0;
    list: any[] = [];
    title: string = '选择车型';
    preControl: any;
    form: FormGroup;

    @ViewChild(LayoutOutletComponent) layout: LayoutOutletComponent;

    constructor(injector: Injector,
        public http: HttpClient,
        public url: Iwe7Url2Service,
        public ele: ElementRef,
        public fb: FormBuilder
    ) {
        super(injector);
        this.form = this.fb.group({
            key: ['']
        });
        this.form.valueChanges.pipe(
            pluck('key')
        ).subscribe((res: string) => {
            this.list.sort(item => {
                const keys = res.split('');
                let total = 0;
                keys.map(str => {
                    total += item.name.indexOf(str);
                });
                return -total;
            });
        });
        this.getCyc('ngOnInit').subscribe(res => {
            const { brand, type, control } = this._customData;
            this.brand = brand;
            this.type = type;
            this.preControl = control;
            if (this.type) {
                this.selectId = this.type.id;
            }
            this.init();
            this.layout.showFooter();
            this.layout.showHeader();
        });
    }

    selectType(item: any) {
        this.type = {
            title: item.name,
            id: item.id
        };
        this.selectId = item.id;
        this.title = item.name;
    }

    sure() {
        this._customClose({
            brand: this.brand,
            type: this.type
        });
    }

    pre() {
        this.preControl();
    }

    cancel() {
        this._customClose({
            brand: this.brand,
            type: this.type
        });
    }

    init() {
        const url = this.url.getOpenUrl('shibida/car/getCarBrandType', {
            id: this.brand.id
        });
        this.http.get(url).pipe(map((res: any) => res.data)).subscribe(res => {
            this.run(() => {
                this.list = res;
                this._cd.markForCheck();
            });
        });
    }
}
