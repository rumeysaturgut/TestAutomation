import axios from 'axios';

let isExistElement = false,
	isExistString = false,
	counterElement = 0,
	counterString = 0;
const keyboardEvent = document.createEvent('KeyboardEvent');
const initMethod =
	typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? 'initKeyboardEvent' : 'initKeyEvent';

keyboardEvent[initMethod](
	'keydown', // event type : keydown, keyup, keypress
	true, // bubbles
	true, // cancelable
	window, // viewArg: should be window
	false, // ctrlKeyArg
	false, // altKeyArg
	false, // shiftKeyArg
	false, // metaKeyArg
	40, // keyCodeArg : unsigned long the virtual key code, else 0
	0, // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
);
document.dispatchEvent(keyboardEvent);

const fireKey = (key) => {
	if (document.createEventObject) {
		const eventObj = document.createEventObject();
		eventObj.keyCode = key;
		document.fireEvent('onkeydown', eventObj);
		eventObj.keyCode = key;
	} else if (document.createEvent) {
		const eventObj = document.createEvent('Events');
		eventObj.initEvent('keydown', true, true);
		eventObj.which = key;
		eventObj.keyCode = key;
		document.dispatchEvent(eventObj);
	}
};

const methods = {
	getElementByXpath: (path) => {
		return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
			.singleNodeValue;
	},

	goToHomepage: (element) => {
		this.executeDuration(this.goRight, 2000);
		this.executeDuration(this.enter, 2000);
		this.executeDuration(this.goRight, 2000);
		element = document.querySelector('.focusable-item.focus');
		return element;
	},

	goToLiveChannel: (element) => {
		for (;;) {
			if (this.hasWidgetIxName(element, 'WidgetLive') === true) break;
			this.goDown();
			element = document.querySelector('.focusable-item.focus');
			return element;
		}
	},

	goToLiveChannelPage: () => {
		this.executeDuration(this.enter, 1000);
		this.executeDuration(this.enter, 1000);
	},

	executeDuration: (keyFunction, timeout) => {
		return new Promise(function (resolve, reject) {
			setTimeout(function () {
				keyFunction();
				resolve();
			}, timeout);
		});
	},

	hasWidgetIxName: (element, ixName) => {
		console.log('**element', element);
		console.log('**ixname', element.getAttribute('ix-name'));
		return element.getAttribute('ix-name') === ixName;
	},

	hasInnerText: (element, innerText) => {
		console.log('**element', element);
		console.log('**innerText', element.innerText);
		return element.innerText === innerText;
	},

	goLeft: () => {
		fireKey(37);
	},
	goRight: () => {
		fireKey(39);
	},
	goUp: () => {
		fireKey(38);
	},
	goDown: () => {
		fireKey(40);
	},
	enter: () => {
		fireKey(13);
	},
	goBack: () => {},
	locationShouldBe: (location) => window.location.href === location,
	sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
};
export { methods };
