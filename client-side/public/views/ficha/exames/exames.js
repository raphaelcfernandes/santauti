/**
 * Created by raphael on 2/24/17.
 */
app.controller('examesCtrl', function($scope) {
    for(var i=0;i<9;i++){
        $('#date'+i).datetimepicker({
            language:  'pt-BR',
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            forceParse: 0,
            showMeridian: 1
        })
    }
});