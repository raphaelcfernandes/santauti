/**
 * Created by raphael on 3/1/17.
 */
var dateTimePicker = function ($rootScope) {

    return {
        require: '?ngModel',
        restrict: 'AE',
        scope: {
            pick12HourFormat: '@',
            language: '@',
            useCurrent: '@',
            location: '@',
            autoclose: '@',
            todayHighlight: '@',
            todayBtn: '@',
            orientation:'@'
        },
        link: function (scope, elem, attrs) {
            elem.datetimepicker({
                pick12HourFormat: scope.pick12HourFormat,
                language: scope.language,
                useCurrent: scope.useCurrent,
                autoclose: scope.autoclose,
                todayHighlight: scope.todayHighlight,
                todayBtn: scope.todayBtn,
                orientation: scope.orientation,
                dateFormat: "dd/mm/yy"
            })

            //Local event change
            elem.on('blur', function () {


                /*!// returns moments.js format object
                 scope.dateTime = new Date(elem.data("DateTimePicker").getDate().format());
                 // Global change propagation
                 $rootScope.$broadcast("emit:dateTimePicker", {
                 location: scope.location,
                 action: 'changed',
                 dateTime: scope.dateTime,
                 example: scope.useCurrent
                 });
                 scope.$apply();*/
            })
        }
    };
};


app.directive('dateTimePicker',dateTimePicker);

app.directive("dateMask", [ "$filter", function() {
    return {
        require : "ngModel",
        link : function(scope, element, attrs, ctrl) {
            var formato = 'DD/MM/YYYY';
            var tamanho = 10;
            var stringToDate = function(string) {
                var dateArray = string.split("/");
                var stringDate = dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0];
                return new Date(stringDate);
            };

            var validaDate = function(value) {
                if (isNaN(value)) {
                    return "";
                }
                return moment(value).format(formato) === "Invalid date" ? "" : moment(value).format(formato);
            };

            var _formatDate = function(date) {
                date = date.replace(/[^0-9]+/g, "");
                if (date.length > 2) {
                    date = date.substring(0, 2) + "/" + date.substring(2);
                }
                if (date.length > 5) {
                    date = date.substring(0, 5) + "/" + date.substring(5, 9);
                }
                if (date.length === tamanho) {
                    var retorno = stringToDate(date);
                    return validaDate(retorno);
                }
                return date;
            };

            element.bind("keyup", function() {
                ctrl.$setViewValue(_formatDate(ctrl.$viewValue));
                ctrl.$render();
                scope[attrs.ngModel] = _formatDate(ctrl.$viewValue);
            });

            ctrl.$parsers.push(function(value) {
                if (value.length === tamanho) {
                    var retorno = stringToDate(value);
                    return validaDate(retorno);
                }
            });

            ctrl.$formatters.push(function(value) {
                return validaDate(value);
            });

        }
    };
} ]);