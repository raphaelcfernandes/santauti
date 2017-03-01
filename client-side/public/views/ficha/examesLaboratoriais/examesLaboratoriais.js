/**
 * Created by raphael on 2/24/17.
 */
app.controller('examesLabCtrl', function($scope) {
    $('#dataExame').datetimepicker({
        language:  'pt-BR',
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0
    });
});