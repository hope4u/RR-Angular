var parseDateString = function parseDateString(timezone, string) {
  // german
  var german = /\/(?:Zurich)$/;
  var delimiter = {
    default: ' '
  };
  var months = {};
  var positions = {};

  var startDate = new Date();
  var endDate = new Date();
  if (german.test(timezone)) {
    delimiter.to = ' bis ';
    months = {
      Jan: 0, Feb: 1, Mär: 2, Apr: 3, Mai: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Okt: 9, Nov: 10, Dez: 11
    };
    positions = {
      day: 1, month: 2, year: 3, hour: 4, minute: 5
    };
  }
  // remove timezone
  string = string.replace(/\s{2}.{3}$/, '');
  // remove punctuation
  string = string.replace(/[\.,\/#!$%\^&\*;{}=\-_`~()]/g, '');
  string = string.replace(/[-:]/g, ' ');
  // replace Month Names
  function replaceMonth(match) {
    return months[match];
  }
  // split start/end date
  var split = string.split(delimiter.to);
  var start = split[0];
  var end = split[1];

  // split parts
  start = start.split(delimiter.default);
  end = end.split(delimiter.default);
   
  start = [
    +start[positions.year],
    +start[positions.month].replace(/^.{3}$/, replaceMonth),
    +start[positions.day],
    +start[positions.hour],
    +start[positions.minute],
    0,0
  ];

  // multiday or single day
  if (end.length <= 2) {
    end = [
      +start[0],
      +start[1],
      +start[2],
      +end[0],
      +end[1],
      0,0
    ];
  } else {
    end = [
      +end[positions.year],
      +end[positions.month].replace(/^.{3}$/, replaceMonth),
      +end[positions.day],
      +end[positions.hour],
      +end[positions.minute],
      0,0
    ];
  }

  startDate.setFullYear.apply(startDate, start.slice(0,3)); 
  startDate.setHours.apply(startDate, start.slice(3));
  
  endDate.setFullYear.apply(endDate, end.slice(0,3)); 
  endDate.setHours.apply(endDate, end.slice(3)); 

  return {start: startDate, end: endDate};
  
}