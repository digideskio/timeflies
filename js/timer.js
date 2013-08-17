
// controller for the (countdown)timer and the alarm
function TimerCtrl($scope) {
  var initial = "00:00";
  var alarm = [];
  alarm.push(loadAudio("resources/alarm1.ogg"));
  alarm.push(loadAudio("resources/alarm2.ogg"));

  $scope.started = false;
  $scope.direction = 1;
  $scope.time = 0;
  $scope.timeString = initial;
  //alarm
  $scope.alarm = 0;
  $scope.alarmState = false;
  $scope.alarmOn = false;
  $scope.onOff = "on";

  $scope.timeToString = function() {
    var t = $scope.time;
    var hour = parseInt(t / (60 * 60), 10);
    hour = zero(hour);
    var min = parseInt(t / 60, 10) % 60;
    min = zero(min);
    var sec = t % 60;
    sec = zero(sec);

    var res = min + ":" + sec;
    if(hour > 0) {
      return hour + ":" + res;
    } else {
      return res;
    }
  };

  $scope.tick = function(secs) {
    $scope.time += secs * $scope.direction;
    $scope.time = Math.max(0, $scope.time);
    $scope.timeString = $scope.timeToString();

    if($scope.direction === -1 && $scope.time === 0) {
      $scope.stop();
      if($scope.alarmState) {
        alarm[$scope.alarm].play();
        $scope.alarmOn = true;
      }
    }
  };

  $scope.start = function() {
    $scope.started = true;
  };

  $scope.stop = function() {
    $scope.started = false;
  };

  $scope.reset = function() {
    $scope.time = 0;
    $scope.timeString = initial;
  };

  $scope.countup = function() {
    $scope.direction = 1;
  };

  $scope.countdown = function() {
    $scope.direction = -1;
  };

  $scope.add = function(time) {
    $scope.tick(time * $scope.direction);
  };

  $scope.setAlarm = function(n) {
    $scope.alarm = n;
  };

  $scope.toggleAlarm = function() {
    $scope.alarmState = !$scope.alarmState;
    $scope.onOff = $scope.alarmState ? "off" : "on";
  };

  $scope.stopAlarm = function() {
    if($scope.alarmOn) {
      $scope.toggleAlarm();
      alarm.forEach(function(a) {a.pause()});
      $scope.alarmOn = false;
    }
  };

  setInterval(function(){
    $scope.$apply(function() {
      if($scope.started) {
        $scope.tick(1);
      }
    });
  }, 1000);
}