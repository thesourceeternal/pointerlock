/* Experiments in making "esc" toggle pointerlock
 http://www.html5rocks.com/en/tutorials/pointerlock/intro/
*/

window.onload = function () {
	// Does the user's browser support pointerlock
	var havePointerLock = 'pointerLockElement' in document ||
	    'mozPointerLockElement' in document ||
	    'webkitPointerLockElement' in document;

	if (!havePointerLock) {
		alert("Sorry, your browser does not support pointer lock.");
	} else {  // This is the bulk of the action

		var lockElement = document.body;
		console.log(lockElement);

		// Give a name to the automatic pointerlock functions
		lockElement.requestPointerLock = lockElement.requestPointerLock ||
			     lockElement.mozRequestPointerLock ||
			     lockElement.webkitRequestPointerLock;

		// Ask the browser to lock the pointer
		lockElement.requestPointerLock();

		// Hook pointer lock state change events
		document.addEventListener('pointerlockchange', testPointerLock, false);
		document.addEventListener('mozpointerlockchange', testPointerLock, false);
		document.addEventListener('webkitpointerlockchange', testPointerLock, false);

		testPointerLock();
		
		// // Ask the browser to release the pointer
		// document.exitPointerLock = document.exitPointerLock ||
		// 			   document.mozExitPointerLock ||
		// 			   document.webkitExitPointerLock;
		// document.exitPointerLock();
		
	}

	/* ===================================
	   Functions
	   ==================================== */
	function testPointerLock () {
		// Check for locked pointer
		if (document.pointerLockElement === lockElement ||
			document.mozPointerLockElement === lockElement ||
			document.webkitPointerLockElement === lockElement) {  // Pointer is locked

			console.log("Pointer is locked");

			// // Get mousemoves in pointerlock way
			// document.addEventListener("mousemove", this.moveCallback, false);
		} else {  // Pointer is unlocked
			console.log("Pointer is FREE!");
			
			// // Disable the mousemove listener
			// document.removeEventListener("mousemove", this.moveCallback, false);
			
			// // I assume this means "do stuff"
			// this.unlockHook(this.lockElement);
		}
	}

	function pointerLockError () {

	}
}
