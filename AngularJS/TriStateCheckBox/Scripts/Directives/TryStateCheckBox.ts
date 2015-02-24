/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/angularjs/angular.d.ts" /> 

module Samples.Controls {
	/** 
	* Scope declaration for CheckBox.
	*/
	export class CheckBoxScopeDeclaration {
		isChecked: string;
		isThreeState: string;
	}

	/** 
	* Interface for CheckBox scope.
	*/
	export interface ICheckBoxScope extends ng.IScope {
		isChecked: boolean;
		isThreeState: boolean;
		updateState: () => void;
	}

	/**
	* HTML checkbox with three states: true, false and null.
	* @class
	*/
	export class CheckBox implements ng.IDirective {
		public template: any;
		public link: (scope: ng.IScope, instanceElement: ng.IAugmentedJQuery, instanceAttributes: ng.IAttributes, controller: any, transclude: ng.ITranscludeFunction) => void;
		public restrict: string;
		public transclude: boolean;
		public scope: CheckBoxScopeDeclaration;

		/**
		* Creates a new CheckBox directive.
		*/
		public static Create(): CheckBox {
			var checkBox = new CheckBox();

			checkBox.restrict = "EA";
			checkBox.template = "<input type=\"checkbox\" ng-click=\"updateState()\" /><span ng-transclude></span>";
			checkBox.transclude = true;

			checkBox.scope = new CheckBoxScopeDeclaration();
			checkBox.scope.isChecked = "=";
			checkBox.scope.isThreeState = "=";

			// Initialize component
			checkBox.link = ($scope: ICheckBoxScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
				var checkBoxInputElement = <HTMLInputElement>element[0].childNodes[0];
				checkBoxInputElement.indeterminate = $scope.isThreeState && $scope.isChecked == null;
				checkBoxInputElement.checked = $scope.isChecked;

				// Update the scope values when the checkbox is clicked.
				$scope.updateState = () => checkBox.UpdateState($scope);

				// Update the checked and indeterminate attribute of the checkbox control.
				$scope.$watch("isChecked",
					(newValue, oldValue) => {
						if (oldValue != newValue) {
							checkBoxInputElement.indeterminate = $scope.isThreeState && newValue == null;
							checkBoxInputElement.checked = newValue;
						}
					},
					true);
			};

			return checkBox;
		}

		/** 
		* Change state of isChecked in scope if attribute checked on checkbox has changed.
		* @param {ICheckBoxScope} scope - The scope of the CheckBox directive.
		*/
        private UpdateState($scope): void {
			if ($scope.isChecked === false) {
				$scope.isChecked = true;
			} else if ($scope.isChecked === true && $scope.isThreeState) {
				$scope.isChecked = null;
			} else {
				$scope.isChecked = false;
			}
		}
	}
}