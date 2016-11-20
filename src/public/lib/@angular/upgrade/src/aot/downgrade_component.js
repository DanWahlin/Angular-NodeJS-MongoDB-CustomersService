/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentFactoryResolver } from '@angular/core';
import { $INJECTOR, $PARSE, INJECTOR_KEY } from './constants';
import { DowngradeComponentAdapter } from './downgrade_component_adapter';
var downgradeCount = 0;
/**
 * @experimental
 */
export function downgradeComponent(info) {
    var idPrefix = "NG2_UPGRADE_" + downgradeCount++ + "_";
    var idCount = 0;
    var directiveFactory = function ($injector, $parse) {
        return {
            restrict: 'E',
            require: '?^' + INJECTOR_KEY,
            link: function (scope, element, attrs, parentInjector, transclude) {
                if (parentInjector === null) {
                    parentInjector = $injector.get(INJECTOR_KEY);
                }
                var componentFactoryResolver = parentInjector.get(ComponentFactoryResolver);
                var componentFactory = componentFactoryResolver.resolveComponentFactory(info.component);
                if (!componentFactory) {
                    throw new Error('Expecting ComponentFactory for: ' + info.component);
                }
                var facade = new DowngradeComponentAdapter(idPrefix + (idCount++), info, element, attrs, scope, parentInjector, $parse, componentFactory);
                facade.setupInputs();
                facade.createComponent();
                facade.projectContent();
                facade.setupOutputs();
                facade.registerCleanup();
            }
        };
    };
    directiveFactory.$inject = [$INJECTOR, $PARSE];
    return directiveFactory;
}
//# sourceMappingURL=downgrade_component.js.map