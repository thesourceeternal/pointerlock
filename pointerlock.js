/* Experiments in making "esc" toggle pointerlock
 http://www.html5rocks.com/en/tutorials/pointerlock/intro/
*/

window.onload = function () {

	// Make all the pointer lock things work
	pointerLock._init_();

}  // end window on load

pointerLock = {

	/* ===================================
	   Setup
	   ==================================== */

	// Element the pointer lock is assigned to
	lockElement: null,
	// Should toggling pointer lock (whatever key is assigned)
	// lock the pointer?
	shouldLock: true,

	_init_: function () {

		// Does the user's browser support pointerlock
		var havePointerLock = 'pointerLockElement' in document ||
		    'mozPointerLockElement' in document ||
		    'webkitPointerLockElement' in document;

		if (!havePointerLock) {  // For browsers that don't support pointerlock

			alert("Sorry, your browser does not support pointer lock.");

		} else {  // This is the bulk of the action

			this.lockElement = document.body;
			lockElement = this.lockElement;

			// Give a name to the automatic pointerlock functions
			// Ask the browser to lock the pointer
			lockElement.requestPointerLock = lockElement.requestPointerLock ||
				     lockElement.mozRequestPointerLock ||
				     lockElement.webkitRequestPointerLock;

			// Ask the browser to release/unlock the pointer
			document.exitPointerLock = document.exitPointerLock ||
					   document.mozExitPointerLock ||
					   document.webkitExitPointerLock;

			// Hook pointer lock state change events (automatically assigned strings)
			document.addEventListener('pointerlockchange', this.changePointerLock, false);
			document.addEventListener('mozpointerlockchange', this.changePointerLock, false);
			document.addEventListener('webkitpointerlockchange', this.changePointerLock, false);

			document.addEventListener( 'pointerlockerror', this.pointerLockError, false );
			document.addEventListener( 'mozpointerlockerror', this.pointerLockError, false );
			document.addEventListener( 'webkitpointerlockerror', this.pointerLockError, false );

			// THIS WILL BE IN THE CONTROLS SCRIPT

			document.addEventListener('keyup', function (event) {

				var keyCode = ('which' in event) ? event.which : event.keyCode;

				if (keyCode === 27) { pointerLock.toggleLock(); }

			}, false);  // end keydown event listener
			
		}

	},  // end _init_()


	/* ===================================
	   Functions
	   ==================================== */

	// Should changing the DOM be here? Probably not, though something should
	changePointerLock: function () {
	},  // end changePointerLock()

	toggleLock: function () {

		var shouldLock = this.shouldLock;

		if (shouldLock) {

			this.lockElement.requestPointerLock();
			this.shouldLock = false;

		} else {
			document.exitPointerLock();
			this.shouldLock = true;

		}
	},  // end toggleLock()

	pointerLockError: function () {

		console.log("Pointer Lock Error");
		// TODO: Check out https://dvcs.w3.org/hg/pointerlock/raw-file/default/index.html#dfn-target
		// for better error messages.

	},  // end pointerLockError()
}
