/**
 * Created by raphael on 2/13/17.
 */

app.controller('homeCtrl', function($scope,$state) {
    $scope.visualizar = function(age){
        $state.go("visualizarPaciente",{
            id: age
        });
    }
    $scope.pacientes = [
        {name:'Jose Pereira da Costa', age:25, gender:'boy'},
        {name:'Raphael Cardoso Fernandes', age:30, gender:'girl'},
        {name:'Angelo Caetano Fernandes', age:28, gender:'girl'},
        {name:'Joelma Aparecida Borges', age:15, gender:'girl'},
        {name:'Lucas Borges Fernandes', age:28, gender:'girl'},
        {name:'Laura Borges Fernandes', age:95, gender:'boy'},
        {name:'Neide Garcia Cardoso', age:50, gender:'boy'},
        {name:'Fulano da Silva Sauro', age:27, gender:'girl'},
        {name:'Beltrano Amado de Jesus', age:40, gender:'boy'},
        {name:'Gabriel Antonio Alves Costa', age:60, gender:'girl'}
    ];
});
