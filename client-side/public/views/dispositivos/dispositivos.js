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
    $rootScope.reqWithToken('/getAllDispositivosByIdPaciente?idPaciente=' + sessionStorage.getItem("ID"), '', 'GET', function (success) {
        $scope.dispositivos = success;
        for(var i=0;i<$scope.dispositivos.length;i++){
            $scope.dispositivos[i].DataInicio = moment($scope.dispositivos[i].DataInicio,'YYYY-MM-DD H:m:s').format("LLL");
            if($scope.dispositivos[i].DataFim!==null) {
                $scope.dispositivos[i].DataFim = moment($scope.dispositivos[i].DataFim, 'YYYY-MM-DD H:m:s').format("LLL");
                $scope.dispositivos[i].preenchido=true;
            }
        }
    }, function (err) {
        console.log(err);
    });




    var that = this;

    // date picker
    this.picker1 = {
        date: new Date('2015-03-01T00:00:00Z'),
        datepickerOptions: {
            showWeeks: false,
            startingDay: 1,
            dateDisabled: function(data) {
                return (data.mode === 'day' && (new Date().toDateString() == data.date.toDateString()));
            }
        }
    };

    // time picker
    this.picker2 = {
        date: new Date('2015-03-01T12:30:00Z'),
        timepickerOptions: {
            readonlyInput: false,
            showMeridian: false
        }
    };

    // date and time picker
    this.picker3 = {
        date: new Date()
    };

    // min date picker
    this.picker4 = {
        date: new Date(),
        datepickerOptions: {
            maxDate: null
        }
    };

    // max date picker
    this.picker5 = {
        date: new Date(),
        datepickerOptions: {
            minDate: null
        }
    };

    // set date for max picker, 10 days in future
    this.picker5.date.setDate(this.picker5.date.getDate() + 10);

    // global config picker
    this.picker6 = {
        date: new Date()
    };

    // dropdown up picker
    this.picker7 = {
        date: new Date()
    };

    // view mode picker
    this.picker8 = {
        date: new Date(),
        datepickerOptions: {
            mode: 'year',
            minMode: 'year',
            maxMode: 'year'
        }
    };

    // dropdown up picker
    this.picker9 = {
        date: null
    };

    // min time picker
    this.picker10 = {
        date: new Date('2016-03-01T09:00:00Z'),
        timepickerOptions: {
            max: null
        }
    };

    // max time picker
    this.picker11 = {
        date: new Date('2016-03-01T10:00:00Z'),
        timepickerOptions: {
            min: null
        }
    };

    // button bar
    this.picker12 = {
        date: new Date(),
        buttonBar: {
            show: true,
            now: {
                show: true,
                text: 'Now!'
            },
            today: {
                show: true,
                text: 'Today!'
            },
            clear: {
                show: false,
                text: 'Wipe'
            },
            date: {
                show: true,
                text: 'Date'
            },
            time: {
                show: true,
                text: 'Time'
            },
            close: {
                show: true,
                text: 'Shut'
            }
        }
    };

    // when closed picker
    this.picker13 = {
        date: new Date(),
        closed: function(args) {
            that.closedArgs = args;
        }
    };

    // saveAs - ISO
    this.picker14 = {
        date: new Date().toISOString()
    }

    this.openCalendar = function(e, picker) {
        that[picker].open = true;
    };

    // watch min and max dates to calculate difference
    var unwatchMinMaxValues = $scope.$watch(function() {
        return [that.picker4, that.picker5, that.picker10, that.picker11];
    }, function() {
        // min max dates
        that.picker4.datepickerOptions.maxDate = that.picker5.date;
        that.picker5.datepickerOptions.minDate = that.picker4.date;

        if (that.picker4.date && that.picker5.date) {
            var diff = that.picker4.date.getTime() - that.picker5.date.getTime();
            that.dayRange = Math.round(Math.abs(diff/(1000*60*60*24)))
        } else {
            that.dayRange = 'n/a';
        }

        // min max times
        that.picker10.timepickerOptions.max = that.picker11.date;
        that.picker11.timepickerOptions.min = that.picker10.date;
    }, true);


    // destroy watcher
    $scope.$on('$destroy', function() {
        unwatchMinMaxValues();
    });


});