/* Experiments in making "esc" toggle pointerlock
 http://www.html5rocks.com/en/tutorials/pointerlock/intro/
*/

window.onload = function () {

	// Does the user's browser support pointerlock
	var havePointerLock = 'pointerLockElement' in document ||
	    'mozPointerLockElement' in document ||
	    'webkitPointerLockElement' in document;

	if (!havePointerLock) {  // For browsers that don't support pointerlock

		alert("Sorry, your browser does not support pointer lock.");

	} else {  // This is the bulk of the action

		var lockElement = document.body;

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
		document.addEventListener('pointerlockchange', testPointerLock, false);
		document.addEventListener('mozpointerlockchange', testPointerLock, false);
		document.addEventListener('webkitpointerlockchange', testPointerLock, false);

		document.addEventListener( 'pointerlockerror', pointerLockError, false );
		document.addEventListener( 'mozpointerlockerror', pointerLockError, false );
		document.addEventListener( 'webkitpointerlockerror', pointerLockError, false );

		// Should the esc key lock the pointer bool
		var escShouldLockPointer = true;

		document.addEventListener('keyup', function (event) {

			var keyCode = ('which' in event) ? event.which : event.keyCode;

			if (keyCode === 27) {

				escShouldLockPointer = toggleLock(escShouldLockPointer);

			}

		}, false);  // end keydown event listener

		testPointerLock();
		
	}

	/* ===================================
	   Functions
	   ==================================== */
	function testPointerLock () {
		console.log("*** In testPointerLock() ***");
		// Check for locked pointer
		if (document.pointerLockElement === lockElement ||
			document.mozPointerLockElement === lockElement ||
			document.webkitPointerLockElement === lockElement) {  // Pointer is locked

			console.log("Pointer is locked");

		} else {  // Pointer is unlocked

			console.log("Pointer is FREE!");

		}
	}  // end testPointerLock()

	// Should changing the DOM be here? Probably not, though something should
	function changePointerLock () {
	}  // end changePointerLock

	function toggleLock (escShouldLockPointer) {

		if (escShouldLockPointer) {

			lockElement.requestPointerLock();
			escShouldLockPointer = false;

			return escShouldLockPointer;

		} else {
			document.exitPointerLock();
			escShouldLockPointer = true;

			return escShouldLockPointer;

		}
	}  // end toggleLock()

	function pointerLockError () {

		console.log("Pointer Lock Error");
		// TODO: Check out https://dvcs.w3.org/hg/pointerlock/raw-file/default/index.html#dfn-target
		// for better error messages.

	}  // end pointerLockError()

}  // end window on load
