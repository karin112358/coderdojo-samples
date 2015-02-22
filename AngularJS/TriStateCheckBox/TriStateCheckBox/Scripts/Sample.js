/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/angularjs/angular.d.ts" /> 
"use strict";
var Samples;
(function (Samples) {
    var Controls;
    (function (Controls) {
        /**
        * Scope declaration for CheckBox.
        */
        var CheckBoxScopeDeclaration = (function () {
            function CheckBoxScopeDeclaration() {
            }
            return CheckBoxScopeDeclaration;
        })();
        Controls.CheckBoxScopeDeclaration = CheckBoxScopeDeclaration;
        /**
        * HTML checkbox with three states: true, false and null.
        * @class
        */
        var CheckBox = (function () {
            function CheckBox() {
            }
            /**
            * Creates a new CheckBox directive.
            * @param {ng.ITimeoutService} $timeout - AngularJS timeout service.
            */
            CheckBox.Create = function ($timeout) {
                var newCheckBox = new CheckBox();
                newCheckBox.restrict = "EA";
                newCheckBox.template = "<input type=\"checkbox\" /><span ng-transclude></span>";
                newCheckBox.transclude = true;
                newCheckBox.scope = new CheckBoxScopeDeclaration();
                newCheckBox.scope.isChecked = "=";
                newCheckBox.scope.isThreeState = "=";
                // Initialize component
                newCheckBox.link = function (scope, element, attrs) {
                    //var updateCheckBox = newCheckBox;
                    //var updateElement = element;
                    $timeout(function () {
                        scope.checkBox = element[0].childNodes[0];
                        scope.checkBox.indeterminate = scope.isThreeState && scope.isChecked == null;
                        scope.checkBox.checked = scope.isChecked;
                        // Update the checked and indeterminate attribute of the checkbox control.
                        scope.$watch("isChecked", function (newValue, oldValue) {
                            if (oldValue != newValue) {
                                scope.checkBox.indeterminate = scope.isThreeState && newValue == null;
                                scope.checkBox.checked = newValue;
                            }
                        }, true);
                        // Update the scope values when the checked attribute of the checkbox control has changed.
                        scope.checkBox.onclick = function (e) {
                            scope.$apply(function () {
                                newCheckBox.ChangeState(scope);
                            });
                        };
                    });
                };
                return newCheckBox;
            };
            /**
            * Change state of isChecked in scope if attribute checked on checkbox has changed.
            * @param {ICheckBoxScope} scope - The scope of the CheckBox directive.
            */
            CheckBox.prototype.ChangeState = function (scope) {
                if (scope.isChecked === false) {
                    scope.isChecked = true;
                }
                else if (scope.isChecked === true && scope.isThreeState) {
                    scope.isChecked = null;
                }
                else {
                    scope.isChecked = false;
                }
            };
            return CheckBox;
        })();
        Controls.CheckBox = CheckBox;
    })(Controls = Samples.Controls || (Samples.Controls = {}));
})(Samples || (Samples = {}));
//# sourceMappingURL=Sample.js.map