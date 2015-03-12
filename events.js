angular.module('eventsApp', [])
  .controller('eventsController', ['$scope', function ($scope) {
  
    var dateOptions = {
      long: {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'        
      },
      basic: {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      },
      short: {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'      
      },
    };

    var startDatetime = function () {
      return {
        long: this.end.toLocaleString('de', dateOptions.long),
        basic: this.end.toLocaleString('de', dateOptions.basic),
        short: this.end.toLocaleString('de', dateOptions.short)
      };
    };
    
    var endDatetime = function () {
    // if same Day print only end Time
      if (this.start.getFullYear() === this.end.getFullYear() && this.start.getMonth() === this.end.getMonth() && this.start.getDate() === this.end.getDate()) {
        return {
          long: this.end.toLocaleString('de', {hour: dateOptions.long.hour, minute: dateOptions.long.minute}),
          basic: this.end.toLocaleString('de', {hour: dateOptions.basic.hour, minute: dateOptions.basic.minute}),
          short: this.end.toLocaleString('de', {hour: dateOptions.short.hour, minute: dateOptions.short.minute})
        };
      } else {
        return {
          long: this.end.toLocaleString('de', dateOptions.long),
          basic: this.end.toLocaleString('de', dateOptions.basic),
          short: this.end.toLocaleString('de', dateOptions.short)
        };
      }
    };


  $scope.events = [
      {
        title: 'Frühlings Lager',
        start: new Date(1425911081917),
        end: new Date(1445921084917),
        age: 'ab Kundschafter',
        description: 'Unser Frühlings Lager ist ein alljährliches Wochenende, dass wir im Rahmen unseres Stammpostens Friesenberg verbringen. Wir haben jedesmal eine super Zeit, kurzweiliges Programm und starke Gemeinschafft.'
      },
      {
        title: 'Stammtreff',
        start: new Date(1425911209909),
        end: new Date(1425911215145),
        age: 'alle Altersstuffen'
       }
    ];
    
    $scope.events.forEach(function (event) {
      event.startDatetime = startDatetime.call(event);
      event.endDatetime = endDatetime.call(event);
    });

  
  }]);