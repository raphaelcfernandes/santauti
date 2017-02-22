/**
 * Created by raphael on 2/22/17.
 */
app.controller('dispositivosCtrl', function($scope) {

    /***********DATEPICKER FUNCTIONS***********************/
    $('#dataInsercaoCateterVenosoCentral').datetimepicker({
        locale: 'pt-br'
    });
    $('#dataRemocaoCateterVenosoCentral').datetimepicker({
        locale: 'pt-br'
    });
    $('#dataInsercaoCateterHemodialise').datetimepicker({
        locale: 'pt-br'
    });
    $('#dataRemocaoCateterHemodialise').datetimepicker({
        locale: 'pt-br'
    });
    $('#dataInsercaoCateterPAI').datetimepicker({
        locale: 'pt-br'
    });
    $('#dataRemocaoCateterPAI').datetimepicker({
        locale: 'pt-br'
    });
    /***********DATEPICKER FUNCTIONS***********************/
});