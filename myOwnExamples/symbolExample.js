// What symbols are for: https://hacks.mozilla.org/2015/06/es6-in-depth-symbols/

// Change these flags and observe the results
var changeFlags = [
	true,   // controls the colour changer independently of all others,
					// even though the property name is shared
	false,  // ditto for the background changer
	false,   // overwritten by the next flag
	true   // controls both the text and border changers,
					// because they share a symbol
];

var playArea = document.getElementById("playArea");

// Abstract class for LocalChanger and SharedChanger
// Do not construct, only extend
class Changer {
	set changeFlag(willChange) {
		playArea[this.changeSym] = !!willChange;
	}
	applyChange() {
		if(playArea[this.changeSym]) {
			this.changeFunction();
		}
	}
}

// These classes use local symbols created with Symbol();
// they will not affect each other
class LocalChanger extends Changer {
	constructor(changeFunction) {
		super();
		this.changeSym = Symbol('shouldChange');
		this.changeFlag = false;
		this.changeFunction = changeFunction;
	}
}

// These classes use shared symbols created with Symbol.for();
// they will affect each other
class SharedChanger extends Changer {
	constructor(changeFunction) {
		super();
		this.changeSym = Symbol.for('shouldChange');
		this.changeFlag = false;
		this.changeFunction = changeFunction;
	}
}

var colourChanger = new LocalChanger(
		() => {playArea.style.color = 'red'; }
);
var bgChanger = new LocalChanger(
		() => {playArea.style.background = 'yellow'; }
);
var textChanger = new SharedChanger(
		() => {playArea.textContent = 'This text HAS been changed!'; }
);
var borderChanger = new SharedChanger(
		() => {playArea.style.border = '5px solid blue'; }
);

var changers = [
		colourChanger,
		bgChanger,
		textChanger,
		borderChanger
];

for(changerKey in changers){
	changers[changerKey].changeFlag = changeFlags[changerKey];
}

for(changer of changers){
	changer.applyChange();
}
