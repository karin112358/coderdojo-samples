/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/angularjs/angular.d.ts" /> 

"use strict"

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

		checkBox: HTMLInputElement;
		updateState: Function;
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
			checkBox.scope.isChecked = "=?";
			checkBox.scope.isThreeState = "=?";

			// Initialize component
			checkBox.link = (scope: ICheckBoxScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
				scope.checkBox = <HTMLInputElement>element[0].childNodes[0];
				scope.checkBox.indeterminate = scope.isThreeState && scope.isChecked == null;
				scope.checkBox.checked = scope.isChecked;

				// Update the scope values when the checked attribute of the checkbox control has changed.
				scope.updateState = () => CheckBox.UpdateState(scope);

				// Update the checked and indeterminate attribute of the checkbox control.
				scope.$watch("isChecked",
					(newValue, oldValue) => {
						if (oldValue != newValue) {
							scope.checkBox.indeterminate = scope.isThreeState && newValue == null;
							scope.checkBox.checked = newValue;
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
        private static UpdateState(scope: ICheckBoxScope) {
			if (scope.isChecked === false) {
				scope.isChecked = true;
			} else if (scope.isChecked === true && scope.isThreeState) {
				scope.isChecked = null;
			} else {
				scope.isChecked = false;
			}
		}
	}
}