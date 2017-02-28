/**
 * Created by raphael on 2/22/17.
 */
app.controller('dispositivosCtrl', function($scope) {
    for(var i=0;i<28;i++){
        $('#date'+i).datetimepicker({
            language:  'pt-BR',
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            forceParse: 0,
        })
    }
});