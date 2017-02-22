/**
 * Created by raphael on 2/22/17.
 */
app.controller('dispositivosCtrl', function($scope) {
    $scope.newValue = function (value) {
        alert(value);
    }

    $(function () {
        $('#dataInsercao').datetimepicker({
            locale: 'pt-br'
        });
        $('#dataRemocao').datetimepicker({
            locale: 'pt-br'
        });
    });
});