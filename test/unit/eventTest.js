describe('Google Events', function () {
  var scope;
  var ctrl;
  var http;
  
  beforeEach(module('eventsApp'));
  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new;
    ctrl = $controller('eventsController', {$scope: scope})
  }));
  
  it('Parse Date String', function () {
    var timezone = 'Europe/Zurich'
    var content = [
      'Sa 14. Mär. 2015 09:00 bis So 15. Mär. 2015 11:00 \nMEZ',
      'Sa 14. Mär. 2015 07:00 bis 08:00 \nMEZ'
    ];
    var starts = [
      new Date(2015, 2, 14, 09, 00),
      new Date(2015, 2, 14, 07, 00)
    ];
    var ends = [
      new Date(2015, 2, 15, 11, 00),
      new Date(2015, 2, 14, 08, 00)
    ];
    var dates = [
      parseDateString(timezone, content[0]),
      parseDateString(timezone, content[1]),     
    ];
    
    expect(dates[0].start.toISOString()).toBe(starts[0].toISOString());
    expect(dates[0].end.toISOString()).toBe(ends[0].toISOString());
    expect(dates[1].start.toISOString()).toBe(starts[1].toISOString());
    expect(dates[1].end.toISOString()).toBe(ends[1].toISOString());
  });
  
  it('AJAX Data Parsing', function () {
    var data = {
      "version":"1.0",
      "encoding":"UTF-8",
      "feed": {
        "gCal$timezone": {"value":"Europe/Zurich"},
        "gCal$timesCleaned": {"value":1},
        "entry": [{
          "published": {"$t":"2015-03-09T14:06:03.000Z"},
          "updated": {"$t":"2015-03-11T12:33:05.000Z"},
          "title": {"$t":"Frühlings Lager","type":"html"},
          "content": {"$t":"Wann: Sa 14. Mär. 2015 09:00 bis So 15. Mär. 2015 11:00 \nMEZ\u003cbr /\u003e\n\n\u003cbr /\u003eWo: Dörflistrasse, Zürich, Schweiz\n\u003cbr /\u003eStatus des Termins: bestätigt\n\u003cbr /\u003eTerminbeschreibung: wer: ab Kundschafter","type":"html"}
        },{
          "published": {"$t":"2015-03-09T14:05:20.000Z"},
          "updated": {"$t":"2015-03-09T14:05:20.000Z"},
          "title": {"$t":"Stammtreff","type":"html"},
          "content": {"$t":"Wann: Sa 14. Mär. 2015 07:00 bis 08:00 \nMEZ\u003cbr /\u003e\n\n\u003cbr /\u003eWo: Döltschiweg, 8055 Zürich, Schweiz\n\u003cbr /\u003eStatus des Termins: bestätigt\n\u003cbr /\u003eTerminbeschreibung: wer: alle Altersstufen\n\nsite:\nthis should be e nice looking site\nwith all the good","type":"html"}
        }]
      }};
    var contents = [
      parseContentString(data.feed.entry[0].content.type, data.feed.entry[0].content.$t),
      parseContentString(data.feed.entry[1].content.type, data.feed.entry[1].content.$t)
    ];
    var test = [
      {
        'Wann': 'Sa 14. Mär. 2015 09:00 bis So 15. Mär. 2015 11:00 \nMEZ',
        'Wo': 'Dörflistrasse, Zürich, Schweiz',
        'Status des Termins': 'bestätigt',
        'description': {
          'age': 'ab Kundschafter',
        }
      },
      {
        'Wann': 'Sa 14. Mär. 2015 07:00 bis 08:00 \nMEZ',
        'Wo': 'Döltschiweg, 8055 Zürich, Schweiz',
        'Status des Termins': 'bestätigt',
        'description': {
          'age': 'alle Altersstufen',
          'site': 'this should be e nice looking site\nwith all the good'
        }
      }
    ];
    expect(contents[0]).toEqual(test[0]);
    expect(contents[1]).toEqual(test[1]);
  });
  
});