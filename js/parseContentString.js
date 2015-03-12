var parseEventDescription = function parseEventDescription(element) {
  var description = {};
  // remove "Eventdescription title"
  var rest = element.replace('Terminbeschreibung: ', '');
  rest = [rest.trim()];

  if (/site:\s/.test(rest)) {
    rest = rest[0].split('site:');
    description.site = rest[1].trim();
  }
  if (/beschreibung:\s/.test(rest)) {
    rest = rest[0].split('beschreibung:');
    description.details = rest[1].trim();
  }
  if (/wer:\s/.test(rest)) {
    rest = rest[0].split('wer:');
    description.age = rest[1].trim();
  }
  
  return description;
};

var parseContentString = function parseContentString(type, string) {
  var information = {};
  // spit with <br />
  string.split('\u003cbr /\u003e').forEach(function (element) {
    element = element.trim();
    if (element === '') return null;
    
    if (/^[^TtEe]/.test(element)) {
     var split = element.split(': ');
      information[split[0]] = split[1];
    } else {
      information.description = parseEventDescription(element);
    }
  });

  return information;
};