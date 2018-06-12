import { CarTypeSelectComponent } from './../car-type-select/car-type-select';
import { CarBrandSelectComponent } from './../car-brand-select/car-brand-select';
import { Iwe7MenuService, Iwe7MaskService } from 'iwe7-layout';
import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';

@Component({
    selector: 'car-brand',
    templateUrl: 'car-brand.html',
    styleUrls: ['./car-brand.scss']
})
export class CarBrandComponent implements OnInit {
    brand: any;
    type: any;
    constructor(
        public menu: Iwe7MenuService,
        public resolver: ComponentFactoryResolver,
        public mask: Iwe7MaskService
    ) { }
    ngOnInit() { }

    selectBrand() {
        const control = (brand: any) => {
            this.brand = brand;
            this.selectType();
        };
        const factory = this.resolver.resolveComponentFactory(CarBrandSelectComponent);
        this.menu.show('right', 270, factory, {
            brand: this.brand,
            control: control
        }).subscribe(res => {
            if (res) {
                this.brand = res.brand;
            }
        });
        this.mask.show();
    }

    selectType() {
        const control = () => {
            this.selectBrand();
        };
        if (this.brand && this.brand.id) {
            const factory = this.resolver.resolveComponentFactory(CarTypeSelectComponent);
            this.menu.show('right', 270, factory, {
                brand: this.brand,
                type: this.type,
                control: control
            }).subscribe(res => {
                if (res) {
                    this.type = res.type;
                    this.brand = res.brand;
                }
            });
            this.mask.show();
        } else {
            this.selectBrand();
        }
    }
}
