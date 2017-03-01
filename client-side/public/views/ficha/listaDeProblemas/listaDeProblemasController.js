/**
 * Created by raphael on 2/21/17.
 */

app.controller('listaDeProblemaCtrl', function($scope,$state) {
    $scope.items = [];
    var id=0;
    var vm = this;
    vm.date = new Date();
    vm.options = '{format:"DD.MM.YYYY HH:mm"}';
    $scope.add = function () {
        $scope.items.push({
            id: id,
            inlineChecked: false,
            question: "",
            questionPlaceholder: "Descricao do problema",
            dataCadastrado: new Date()
        });
        console.log('#dataCadastrado'+id);
        id++;
    };
    $scope.examples = [
        {date: '1/1/2012', isOpen: false},
        {date: '2/1/2012', isOpen: false},
        {date: '3/1/2012', isOpen: false},
    ];

    $scope.examples.forEach(function(example){
        example.date = new Date(example.date);
    });

    $scope.open = function($event, example) {
        $event.preventDefault();
        $event.stopPropagation();

        example.isOpen = true;
    };
});
