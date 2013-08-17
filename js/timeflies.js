
var check = function(x) {
  return typeof x !== "undefined" && x !== null;
};

var zero = function(n) {
  if(check(n) && n < 10) return "0" + n;
  else return n;
};

var loadAudio = function(path) {
  var audio = new Audio(path);
  audio.loop = true;
  return audio;
};

var uuid = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
};

// local storage database
var db = (function() {
  var keyname = "_timeflies_";
  var todos = JSON.parse(localStorage.getItem(keyname)) || {};
  var save = function(data) {
    localStorage.setItem(keyname, JSON.stringify(todos));
  };

  var _db = {
    add: function(todo) {
      todo.id = uuid();
      todo.created = new Date();
      todos[todo.id] = todo;
      save(todos);
      return todo;
    },
    remove: function(todo) {
      delete todos[todo.id];
      save(todos);
    },
    update: function(todo) {
      todos[todo.id] = todo;
      save(todos);
      return todo;
    },
    all: function() {
      return Object.keys(todos).map(function(k) {
        return todos[k];
      });
    }
  };
  return _db;
})();

// angular module definition
angular.module('timeflies', []);

// controler for the header (date)
function HeaderCtrl($scope, $filter) {
  $scope.clock = $filter('date')(Date.now(), 'yyyy/MM/dd HH:mm');
    
  setInterval(function(){
    $scope.$apply(function() {
      $scope.clock = Date.now();
    });
  }, 2000);
}

// controller for the menu (export, import)
function MenuCtrl($scope) {

}