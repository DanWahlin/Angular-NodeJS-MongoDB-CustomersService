/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injector, NgZone } from '@angular/core';
import * as angular from '../angular_js';
/**
 * The Ng1Module contains providers for the Ng1Adapter and all the core Angular 1 services;
 * and also holds the `bootstrapNg1()` method fo bootstrapping an upgraded Angular 1 app.
 * @experimental
 */
export declare class UpgradeModule {
    injector: Injector;
    ngZone: NgZone;
    $injector: angular.IInjectorService;
    constructor(injector: Injector, ngZone: NgZone);
    /**
     * Bootstrap an Angular 1 application from this NgModule
     * @param element the element on which to bootstrap the Angular 1 application
     * @param [modules] the Angular 1 modules to bootstrap for this application
     * @param [config] optional extra Angular 1 bootstrap configuration
     */
    bootstrap(element: Element, modules?: string[], config?: angular.IAngularBootstrapConfig): void;
}
