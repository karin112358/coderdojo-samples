/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/angularjs/angular.d.ts" /> 
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
                checkBox.link = function ($scope, element, attrs) {
                    var checkBoxInputElement = element[0].childNodes[0];
                    checkBoxInputElement.indeterminate = $scope.isThreeState && $scope.isChecked == null;
                    checkBoxInputElement.checked = $scope.isChecked;
                    // Update the scope values when the checkbox is clicked.
                    $scope.updateState = function () { return checkBox.UpdateState($scope); };
                    // Update the checked and indeterminate attribute of the checkbox control.
                    $scope.$watch("isChecked", function (newValue, oldValue) {
                        if (oldValue != newValue) {
                            checkBoxInputElement.indeterminate = $scope.isThreeState && newValue == null;
                            checkBoxInputElement.checked = newValue;
                        }
                    }, true);
                };
                return checkBox;
            };
            /**
            * Change state of isChecked in scope if attribute checked on checkbox has changed.
            * @param {ICheckBoxScope} scope - The scope of the CheckBox directive.
            */
            CheckBox.prototype.UpdateState = function ($scope) {
                if ($scope.isChecked === false) {
                    $scope.isChecked = true;
                }
                else if ($scope.isChecked === true && $scope.isThreeState) {
                    $scope.isChecked = null;
                }
                else {
                    $scope.isChecked = false;
                }
            };
            return CheckBox;
        })();
        Controls.CheckBox = CheckBox;
    })(Controls = Samples.Controls || (Samples.Controls = {}));
})(Samples || (Samples = {}));
//# sourceMappingURL=Sample.js.map