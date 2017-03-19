/**
 * Created by raphael on 3/1/17.
 */

// var dateTimePicker = function ($rootScope) {
//
//     return {
//         require: '?ngModel',
//         restrict: 'AE',
//         scope: {
//             pick12HourFormat: '@',
//             language: '@',
//             useCurrent: '@',
//             location: '@',
//             autoclose: '@',
//             todayHighlight: '@',
//             todayBtn: '@',
//             orientation:'@'
//         },
//         link: function (scope, elem, attrs) {
//             elem.datetimepicker({
//                 pick12HourFormat: scope.pick12HourFormat,
//                 language: scope.language,
//                 useCurrent: scope.useCurrent,
//                 autoclose: scope.autoclose,
//                 todayHighlight: scope.todayHighlight,
//                 todayBtn: scope.todayBtn,
//                 orientation: scope.orientation,
//                 dateFormat: "dd/mm/yy"
//             })
//
//             //Local event change
//             elem.on('blur', function () {
//
//
//                 /*!// returns moments.js format object
//                  scope.dateTime = new Date(elem.data("DateTimePicker").getDate().format());
//                  // Global change propagation
//                  $rootScope.$broadcast("emit:dateTimePicker", {
//                  location: scope.location,
//                  action: 'changed',
//                  dateTime: scope.dateTime,
//                  example: scope.useCurrent
//                  });
//                  scope.$apply();*/
//             })
//         }
//     };
// };


//app.directive('dateTimePicker',dateTimePicker);

app.directive('datetimepicker', function(){
    return {
        require: '?ngModel',
        restrict: 'A',
        link: function(scope, element, attrs, ngModel){

            if(!ngModel) return; // do nothing if no ng-model

            ngModel.$render = function(){
                element.find('input').val( ngModel.$viewValue || '' );
            }

            element.on('dp.change', function(){
                scope.$apply(read);
            });

            read();

            function read() {
                var value = element.find('input').val();
                ngModel.$setViewValue(value);
            }
        }
    }
});