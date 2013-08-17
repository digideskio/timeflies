
// controller for the todo functionality
function TodoCtrl($scope) {
  $scope.adding = false;
  $scope.newTodoText = '';

  $scope.todos = db.all();

  $scope.showAdd = function() {
    $scope.adding = true;
  };

  $scope.add = function() {
    var todo = {text: $scope.newTodoText};
    db.add(todo);
    $scope.todos = db.all();
    $scope.adding = false;
  };
}