/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injector, NgModule, NgZone } from '@angular/core';
import * as angular from '../angular_js';
import { controllerKey } from '../util';
import { angular1Providers, setTempInjectorRef } from './angular1_providers';
import { $INJECTOR, INJECTOR_KEY, UPGRADE_MODULE_NAME } from './constants';
/**
 * The Ng1Module contains providers for the Ng1Adapter and all the core Angular 1 services;
 * and also holds the `bootstrapNg1()` method fo bootstrapping an upgraded Angular 1 app.
 * @experimental
 */
export var UpgradeModule = (function () {
    function UpgradeModule(injector, ngZone) {
        this.injector = injector;
        this.ngZone = ngZone;
    }
    /**
     * Bootstrap an Angular 1 application from this NgModule
     * @param element the element on which to bootstrap the Angular 1 application
     * @param [modules] the Angular 1 modules to bootstrap for this application
     * @param [config] optional extra Angular 1 bootstrap configuration
     */
    UpgradeModule.prototype.bootstrap = function (element, modules, config) {
        var _this = this;
        if (modules === void 0) { modules = []; }
        // Create an ng1 module to bootstrap
        var upgradeModule = angular
            .module(UPGRADE_MODULE_NAME, modules)
            .value(INJECTOR_KEY, this.injector)
            .run([
            $INJECTOR,
            function ($injector) {
                _this.$injector = $injector;
                // Initialize the ng1 $injector provider
                setTempInjectorRef($injector);
                _this.injector.get($INJECTOR);
                // Put the injector on the DOM, so that it can be "required"
                angular.element(element).data(controllerKey(INJECTOR_KEY), _this.injector);
                // Wire up the ng1 rootScope to run a digest cycle whenever the zone settles
                var $rootScope = $injector.get('$rootScope');
                _this.ngZone.onMicrotaskEmpty.subscribe(function () { return _this.ngZone.runOutsideAngular(function () { return $rootScope.$evalAsync(); }); });
            }
        ]);
        // Bootstrap the angular 1 application inside our zone
        this.ngZone.run(function () { angular.bootstrap(element, [upgradeModule.name], config); });
    };
    UpgradeModule.decorators = [
        { type: NgModule, args: [{ providers: angular1Providers },] },
    ];
    /** @nocollapse */
    UpgradeModule.ctorParameters = [
        { type: Injector, },
        { type: NgZone, },
    ];
    return UpgradeModule;
}());
//# sourceMappingURL=upgrade_module.js.map