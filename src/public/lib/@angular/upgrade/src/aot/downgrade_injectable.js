/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { INJECTOR_KEY } from './constants';
/**
 * Create an Angular 1 factory that will return an Angular 2 injectable thing
 * (e.g. service, pipe, component, etc)
 *
 * Usage:
 *
 * ```
 * angular1Module.factory('someService', downgradeInjectable(SomeService))
 * ```
 *
 * @experimental
 */
export function downgradeInjectable(token) {
    return [INJECTOR_KEY, function (i) { return i.get(token); }];
}
//# sourceMappingURL=downgrade_injectable.js.map