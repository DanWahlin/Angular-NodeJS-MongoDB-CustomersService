/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DoCheck, ElementRef, Injector, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
/**
 * @experimental
 */
export declare class UpgradeComponent implements OnInit, OnChanges, DoCheck, OnDestroy {
    private name;
    private elementRef;
    private injector;
    private $injector;
    private $compile;
    private $templateCache;
    private $httpBackend;
    private $controller;
    private element;
    private $element;
    private $componentScope;
    private directive;
    private bindings;
    private linkFn;
    private controllerInstance;
    private bindingDestination;
    constructor(name: string, elementRef: ElementRef, injector: Injector);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngDoCheck(): void;
    ngOnDestroy(): void;
    private callLifecycleHook(method, context, arg?);
    private getDirective(name);
    private getDirectiveRequire(directive);
    private initializeBindings(directive);
    private compileTemplate(directive);
    private buildController(controllerType, $scope, $element, controllerAs);
    private resolveRequire(directiveName, $element, require);
    private setupOutputs();
    private notSupported(feature);
    private compileHtml(html);
}
