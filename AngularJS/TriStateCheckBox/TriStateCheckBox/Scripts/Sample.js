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
            */
            CheckBox.Create = function () {
                var checkBox = new CheckBox();
                checkBox.restrict = "EA";
                checkBox.template = "<input type=\"checkbox\" ng-click=\"updateState()\" /><span ng-transclude></span>";
                checkBox.transclude = true;
                checkBox.scope = new CheckBoxScopeDeclaration();
                checkBox.scope.isChecked = "=";
                checkBox.scope.isThreeState = "=";
                // Initialize component
                checkBox.link = function (scope, element, attrs) {
                    scope.checkBox = element[0].childNodes[0];
                    scope.checkBox.indeterminate = scope.isThreeState && scope.isChecked == null;
                    scope.checkBox.checked = scope.isChecked;
                    // Update the scope values when the checked attribute of the checkbox control has changed.
                    scope.updateState = function () { return CheckBox.UpdateState(scope); };
                    // Update the checked and indeterminate attribute of the checkbox control.
                    scope.$watch("isChecked", function (newValue, oldValue) {
                        if (oldValue != newValue) {
                            scope.checkBox.indeterminate = scope.isThreeState && newValue == null;
                            scope.checkBox.checked = newValue;
                        }
                    }, true);
                };
                return checkBox;
            };
            /**
            * Change state of isChecked in scope if attribute checked on checkbox has changed.
            * @param {ICheckBoxScope} scope - The scope of the CheckBox directive.
            */
            CheckBox.UpdateState = function (scope) {
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