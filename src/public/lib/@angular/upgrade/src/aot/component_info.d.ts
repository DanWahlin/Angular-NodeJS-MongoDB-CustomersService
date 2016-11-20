/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Type } from '@angular/core';
export interface ComponentInfo {
    component: Type<any>;
    inputs?: string[];
    outputs?: string[];
}
export declare class PropertyBinding {
    binding: string;
    prop: string;
    attr: string;
    bracketAttr: string;
    bracketParenAttr: string;
    parenAttr: string;
    onAttr: string;
    bindAttr: string;
    bindonAttr: string;
    constructor(binding: string);
    private parseBinding();
}
