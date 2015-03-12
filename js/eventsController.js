var eventsApp = angular.module('eventsApp', [])
  .controller('eventsController', ['$scope', '$http', function ($scope, $http) {
    
    $scope.link = 'https://www.google.com/calendar/feeds/jesus.hope4u2%40gmail.com/private-7d99808a6b1dedb66ba577dd80b7c693/basic?alt=json';
    $http.get($scope.link).success(function (data) {
      $scope.json = {
      "version": data.version,
      "encoding": data.encoding,
      "gCal$timezone": data.feed.gCal$timezone,
      "gCal$timesCleaned": data.feed.gCal$timesCleaned 
      };
      $scope.events = data.feed.entry.map(function (entry) {
        var content = parseContentString(entry.content.type, entry.content.$t);
        return {
          "published": entry.published.$t,
          "updated": entry.updated.$t,
          "title": entry.title.$t,
          "content": content
        };
      });

    });
  }]);