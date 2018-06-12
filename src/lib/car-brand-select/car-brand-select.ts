import { FormGroup, FormBuilder } from '@angular/forms';
import { onChange } from 'iwe7-util';
import { ElementRef } from '@angular/core';
import { map, pluck, tap, debounceTime } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CustomComponent } from 'iwe7-core';
import { Component, Injector, ViewChild, Input } from '@angular/core';
import { Iwe7Url2Service } from 'iwe7-url';
import { IndexListComponent } from 'iwe7-index-list';
import { LayoutOutletComponent } from 'iwe7-layout';

@Component({
    selector: 'car-brand-select',
    templateUrl: 'car-brand-select.html',
    styleUrls: ['./car-brand-select.scss']
})
export class CarBrandSelectComponent extends CustomComponent<any> {
    current: number = 0;
    list: any[] = [];
    title: string = '请选择汽车品牌';
    brand: any;
    @Input() isMulti: boolean = false;
    @ViewChild(IndexListComponent) indexList: IndexListComponent;
    @ViewChild(LayoutOutletComponent) layout: LayoutOutletComponent;

    hasSelected: boolean = false;
    selectId: number = 0;
    nextControl: any;

    @ViewChild('input') input: ElementRef;

    form: FormGroup;
    constructor(
        injector: Injector,
        public http: HttpClient,
        public url: Iwe7Url2Service,
        fb: FormBuilder
    ) {
        super(injector);
        this.form = fb.group({
            key: ['']
        });
        this.getCyc('ngOnInit').subscribe(res => {
            const { brand, control } = this._customData;
            this.brand = brand;
            this.nextControl = control;
            if (this.brand) {
                this.selectId = this.brand.id;
            }
            this.init();
            this.layout.showFooter();
            this.layout.showHeader();
            this.form.valueChanges.pipe(
                pluck('key'),
                debounceTime(300)
            ).subscribe((res: string) => {
                this.init(res);
            });
        });
    }

    select(item: any) {
        if (!this.isMulti) {
            this.list.map(res => {
                res.res.map(item => {
                    item.active = false;
                });
            });
        }
        item.active = true;
        // 选择车型
        this.title = item.name;
        this.selectId = item.id;
        this.brand = {
            id: item.id,
            title: item.name,
            initials: item.initials
        };
        this.hasSelected = true;
        if (!this.isMulti) {
            this.next();
        }
    }

    sure() {
        this._customClose({
            brand: this.brand
        });
    }

    next() {
        this.nextControl(this.brand);
    }

    init(key: string = '') {
        const url = this.url.getOpenUrl('shibida/car/getCarBrand', { key: key });
        this.http.get(url).pipe(map((res: any) => res.data)).subscribe(res => {
            const list = [];
            for (const key in res) {
                list.push({
                    key: key,
                    res: res[key]
                });
            }
            this.run(() => {
                this.list = list;
                this._cd.markForCheck();
            });
        });
    }

    ngForEnded(e: any) {
        setTimeout(() => {
            this.indexList.updateStyle();
        }, 300);
    }
}
