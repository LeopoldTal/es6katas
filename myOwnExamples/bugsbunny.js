function *switchHuntingSeason(huntWhat) {
	var oppositeHunt;

	while(true) {
		oppositeHunt = {'duck': 'wabbit', 'wabbit': 'duck'}[huntWhat];
		if (!oppositeHunt) {
			throw new Error(`I don\'t know how to hunt ${huntWhat}.`);
		}
		huntWhat = yield oppositeHunt;
	}
}

var currentHunt = 'duck';
var huntingDebate = switchHuntingSeason(currentHunt);

for(var ii = 0 ; ii < 10 ; ii++){
	currentHunt = huntingDebate.next(currentHunt).value;
	console.log(currentHunt + ' season!');
}
