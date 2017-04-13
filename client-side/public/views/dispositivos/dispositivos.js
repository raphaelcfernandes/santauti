/**
 * Created by raphael on 2/22/17.
 */
app.controller('dispositivosCtrl', function($scope,$rootScope,$state) {
    /**********SCOPE VARIABLES***********/
    $scope.dispositivos=[];
    $scope.items = [];
    $scope.flagDispositivosShow=false;
    $scope.id=0;
    $scope.Dispositivos = [
        { 'nome' : 'Cateter Venoso Central' },
        { 'nome' : 'Cateter De Hemodialise' },
        { 'nome' : 'Cateter de PAI' },
        { 'nome' : 'Dreno de Torax' },
        { 'nome' : 'Dreno Abdominal' },
        { 'nome' : 'Sonda Vesical' },
        { 'nome' : 'Tubo Orotraquial' },
        { 'nome' : 'Traqueostomia' },
        { 'nome' : 'Gastrostomia' },
        { 'nome' : 'Venoclise' },
        { 'nome' : 'Sonda Enteral' },
        { 'nome' : 'Sonda Oroenteral' },
        { 'nome' : 'Sonda Nasoenteral' },
        { 'nome' : 'Sonda Orogastrica' },
        { 'nome' : 'Sonda Nasogastrical' }
    ];
    $scope.status='Mostrar Dispositivos já removidos';
    /**********SCOPE VARIABLES***********/

    /**
     * Metódo para tratar as listas para enviar ao banco
     */
    $scope.enviar = function () {
        var i;
        var dispositivosParaSalvar;

        /**
         * Verifica se existe dispositivos NAO modificados pelo cliente.
         * Elimina-se de dispositivos itens que nao foram resolvidos e itens antigos JA resolvidos
         */
        for(i=$scope.dispositivos.length-1;i>=0;i--)
            if($scope.dispositivos[i].DataFim===null || $scope.dispositivos[i].preenchido===true)
                $scope.dispositivos.splice(i, 1);

        /**
         * Verifica se existe items novos criados
         * Elimina-se de items os que foram mal preenchidos
         */
        for(i=$scope.items.length-1;i>=0;i--)
            if($scope.items[i].DataInsercao===undefined || $scope.items[i].DispositivoDescricao===undefined)
                $scope.items.splice(i,1);

        if($scope.dispositivos.length>0) {
            dispositivosParaSalvar = {
                idPaciente: sessionStorage.getItem("ID"),
                Dispositivos: $scope.dispositivos
            };
            $rootScope.reqWithToken('/updateDispositivosByIdDispositivoEByIdPaciente', dispositivosParaSalvar, 'PUT', function (success) {
            },function (err) {
                console.log(err);
            });
        }

        if($scope.items.length>0){//Caso a lista de items seja NAO vazia, deve-se enviar para o banco para CRIAR registro
            dispositivosParaSalvar = {
                idPaciente: sessionStorage.getItem("ID"),
                Dispositivos: $scope.items
            };
            $rootScope.reqWithToken('/newDispositivosByIdPaciente', dispositivosParaSalvar, 'POST', function (success) {
            },function (err) {
                console.log(err);
            });
        }

        $state.go('home');
    };

    $scope.add = function () {
        $scope.items.push({
            id: $scope.id
        });
        $scope.id++;
    };

    $scope.remove = function(id){
        var i=0;
        while($scope.items[i].id!==id)
            i++;
        $scope.items.splice(i,1);
    };

    /**
     * Mostra todos os dispositivos de acordo com a ultima data de internaćao.
     * Esta funcao NAO mostra todo o historico de dispositivos
     */
    $scope.mostrarTodos = function(){
        if($scope.flagDispositivosShow===false) {
            $scope.flagDispositivosShow = true;
            $scope.status='Ocultar Dispositivos já removidos';
        }
        else {
            $scope.flagDispositivosShow = false;
            $scope.status='Mostrar Dispositivos já removidos';
        }
    };


    /**
     * Recebe o ID do item a ser resolvido. Esconde a caixa de resolver e mostra a data
     * @param dispositivoID
     */
    $scope.resolver = function (dispositivoID) {
        var i=0;
        while($scope.dispositivos[i].IDDispositivo!==dispositivoID)
            i++;
        $scope.dispositivos[i].resolvido=true;
    };

    /**
     * Recebe o ID do item para cancelar resolvido. Esconde o campo data e mostra caixa resolver
     * @param dispositivoID
     */
    $scope.cancelarResolvido = function (dispositivoID) {
        var i=0;
        while($scope.dispositivos[i].IDDispositivo!==dispositivoID)
            i++;
        $scope.dispositivos[i].resolvido=false;
        console.log($scope.dispositivos);
    };

    /**
     * Requisita ao server todos os disposotivos do Paciente filtrado pela data de internacao mais recente.
     * Apenas dispositivos com data de inseridos > data internacao serao buscados.
     */
    $rootScope.reqWithToken('/getAllDispositivosByLastDataInternacaoAndByIdPaciente?idPaciente=' + sessionStorage.getItem("ID"), '', 'GET', function (success) {
        $scope.dispositivos = success;
        for(var i=0;i<$scope.dispositivos.length;i++){
            $scope.dispositivos[i].DataInicio = moment($scope.dispositivos[i].DataInicio,'YYYY-MM-DD H:m:s').format("LLL");
            if($scope.dispositivos[i].DataFim!==null) {
                $scope.dispositivos[i].DataFim = moment($scope.dispositivos[i].DataFim, 'YYYY-MM-DD H:m:s').format("LLL");
                $scope.dispositivos[i].preenchido=true;
            }
        }
        console.log($scope.dispositivos);
    }, function (err) {
        console.log(err);
    });

});