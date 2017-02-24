/**
 * Created by raphael on 2/21/17.
 */

app.controller('listaDeProblemaCtrl', function($scope,$state) {
    $scope.items = [];

    $scope.add = function () {
        $scope.items.push({
            inlineChecked: false,
            question: "",
            questionPlaceholder: "Descricao do problema",
            text: ""
        });
    };
});
