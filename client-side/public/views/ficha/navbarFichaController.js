/**
 * Created by raphael on 2/21/17.
 */
app.controller('navbarCtrl', function($scope,$state,$location) {
    console.log($state.current.name);
    if($state.current.name == "home"){
        $scope.selectedIndex = 0;
    }else if($state.current.name == "eventosSignificantes"){
        $scope.selectedIndex = 1;
    }else if($state.current.name == "neurologico"){
        $scope.selectedIndex = 2;
    }else if($state.current.name == "hemodinamica"){
        $scope.selectedIndex = 3;
    }else if($state.current.name == "respiratorio"){
        $scope.selectedIndex = 4;
    }else if($state.current.name == "gastrointestinal"){
        $scope.selectedIndex = 5;
    }else if($state.current.name == "renal"){
        $scope.selectedIndex = 6;
    }else if($state.current.name == "hematologico"){
        $scope.selectedIndex = 7;
    }else if($state.current.name == "endocrino"){
        $scope.selectedIndex = 8;
    }else if($state.current.name == "infeccioso"){
        $scope.selectedIndex = 9;
    }else if($state.current.name == "dispositivos"){
        $scope.selectedIndex = 10;
    }else if($state.current.name == "metabolico"){
        $scope.selectedIndex = 11;
    }else if($state.current.name == "nutricao"){
        $scope.selectedIndex = 12;
    }else if($state.current.name == "psicosocial"){
        $scope.selectedIndex = 13;
    }else if($state.current.name == "listaDeProblemas"){
        $scope.selectedIndex = 14;
    }else if($state.current.name == "analise"){
        $scope.selectedIndex = 15;
    }else if($state.current.name == "planos"){
        $scope.selectedIndex = 16;
    }else if($state.current.name == "pendencias"){
        $scope.selectedIndex = 17;
    }else if($state.current.name == "exames"){
        $scope.selectedIndex = 18;
    }else if($state.current.name == "examesLab"){
        $scope.selectedIndex = 19;
    }else if($state.current.name == "interconsulta") {
        $scope.selectedIndex = 20;
    }else if($state.current.name == "login"){
        $scope.selectedIndex = 21;
    }
    $scope.$watch('selectedIndex', function(current, old) {
        switch (current) {
            case 0:
                $state.go("home");
                break;
            case 1:
                $location.url("eventosSignificantes");
                break;
            case 2:
                $location.url("neurologico");
                break;
            case 3:
                $location.url("hemodinamica");
                break;
            case 4:
                $location.url("respiratorio");
                break;
            case 5:
                $location.url("gastrointestinal");
                break;
            case 6:
                $location.url("renal");
                break;
            case 7:
                $location.url("hematologico");
                break;
            case 8:
                $location.url("endocrino");
                break;
            case 9:
                $location.url("infeccioso");
                break;
            case 10:
                $location.url("dispositivos");
                break;
            case 11:
                $location.url("metabolico");
                break;
            case 12:
                $location.url("nutricao");
                break;
            case 13:
                $location.url("psicosocial");
                break;
            case 14:
                $location.url("listaDeProblemas");
                break;
            case 15:
                $location.url("analise");
                break;
            case 16:
                $location.url("planos");
                break;
            case 17:
                $location.url("pendencias");
                break;
            case 18:
                $location.url("exames");
                break;
            case 19:
                $location.url("examesLab");
                break;
            case 20:
                $location.url("interconsulta");
                break;
            case 21:
                $state.go("login");
                $scope.destroySession();
                break;
        }
    });
    $scope.button=false;
    $scope.Button = function(){
        $scope.button=true;
    };
    $scope.destroySession = function () {
        sessionStorage.clear();
    };
});
