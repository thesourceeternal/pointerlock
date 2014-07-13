/* Unit tests */

// Make unitTests global so they can be called in the console
var unitTests = null;

window.addEventListener('load', function () {

	/* ===================================
	   Call all tests
	   ==================================== */
	unitTests = function () {

		/* ===================================
		   Pointer Lock (tests not yet tested)
		   ==================================== */
		console.log("*** In pointerLock testToggleLock() ***");

		if (pointerLock.lockElement) {

			pointerLock.toggleLock();
			var test1 = testToggleLock();

			pointerLock.toggleLock();
			var test2 = testToggleLock();	

			if (test1 !== test2) {

				console.log("Test passed, pointer lock toggled");

			} else {

				console.log("Test failed, pointer lock not toggled");

			}  // end if test1 !== test2


		} else {

			console.log("Can't run pointerlock test, no pointerLock.lockElement");

		}  // end pointerLock testToggleLock();

	};  // end unitTests

	/* ===================================
	   Test Functions
	   ==================================== */
	testToggleLock = function () {
		// Check for locked pointer
		if (document.pointerLockElement === pointerLock.lockElement ||
			document.mozPointerLockElement === pointerLock.lockElement ||
			document.webkitPointerLockElement === pointerLock.lockElement) {  // Pointer is locked

			console.log("Pointer is locked");
			return true;

		} else {  // Pointer is unlocked

			console.log("Pointer is FREE!");
			return false;

		}
	};  // end testToggleLock()

});
