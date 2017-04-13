/**
 * Created by raphael on 2/23/17.
 */
app.controller('nutricaoCtrl', function($scope,$rootScope) {
    if($rootScope.dados===undefined) {
        $rootScope.dados = {};
    }
    $scope.simDieta=false;
    if(Object.keys($rootScope.dados).length > 0 && $rootScope.quantidadeBarra < Object.keys($rootScope.dados).length){
        if($rootScope.determinateValue <= 100){
            $rootScope.quantidadeBarra +=1;
            $rootScope.determinateValue = (5.3)*(Object.keys($rootScope.dados).length);
            console.log($rootScope.determinateValue);
            console.log($rootScope.quantidadeBarra)
        }
    }

    var self = this;

    self.contacts = [{
        'id': 1,
        'fullName': 'Maria Guadalupe',
        'lastName': 'Guadalupe',
        'title': "CEO, Found"
    }, {
        'id': 2,
        'fullName': 'Gabriel García Marquéz',
        'lastName': 'Marquéz',
        'title': "VP Sales & Marketing"
    }, {
        'id': 3,
        'fullName': 'Miguel de Cervantes',
        'lastName': 'Cervantes',
        'title': "Manager, Operations"
    }, {
        'id': 4,
        'fullName': 'Pacorro de Castel',
        'lastName': 'Castel',
        'title': "Security"
    }];
    self.selectedId = 2;
    self.selectedUser = function() {
        return $filter('filter')(self.contacts, { id: self.selectedId })[0].lastName;
    };

});