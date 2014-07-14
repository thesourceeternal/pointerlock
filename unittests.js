/* Unit tests */

// Make unitTests global so they can be called in the console
var unitTests = null;

window.addEventListener('load', function () {

	/* ===================================
	   Call all tests
	   ==================================== */
	unitTests = function () {
		// Need to put tests in a queue

		/* ===================================
		   Pointer Lock (tests not yet tested)
		   ==================================== */
		testToggleLock();


	};  // end unitTests

	/* ===================================
	   Test Functions
	   ==================================== */
	testToggleLock = function () {
		console.log("*** In pointerLock testToggleLock() ***");

		if (pointerLock.lockElement) {

			var test1, test2;

			var runToggle1 = function () {
				console.log("in runToggle1");
				pointerLock.toggleLock();
				test1 = toggleResult();
				return true;
			}

			var runToggle2 = function () {
				console.log("in runToggle2");
				pointerLock.toggleLock();
				test2 = toggleResult();
				return true;
			}

			runToggle1().then(runToggle2()).then(function () {
				console.log("in comparison");

				if (test1 !== test2) {
					console.log("Test passed, pointer lock toggled");

				} else {
					console.log("Test failed, pointer lock not toggled");

				}  // end if test1 !== test2

			});

			// http://www.html5rocks.com/en/tutorials/es6/promises/
			// var promiseTest1 = new Promise(function(resolve, reject) {

			// 	pointerLock.toggleLock();
			// 	test1 = toggleResult();

			// 	if (true) {
			// 		resolve("Stuff worked!");
			// 	} else {
			// 		reject(Error("It broke"));
			// 	}

			// 	return delay(500);
			// });

			// var promiseTest2 = new Promise(function(resolve, reject) {

			// 	pointerLock.toggleLock();
			// 	test2 = toggleResult();

			// 	if (true) {
			// 		resolve("Stuff worked!");
			// 	} else {
			// 		reject(Error("It broke"));
			// 	}

			// 	return delay(500);
			// });

			// promiseTest1.then(promiseTest2).then(function () {

			// 	if (test1 !== test2) {

			// 		console.log("Test passed, pointer lock toggled");

			// 	} else {

			// 		console.log("Test failed, pointer lock not toggled");

			// 	}  // end if test1 !== test2

			// })

			// pointerLock.toggleLock();
			// var test1 = toggleResult();

			// pointerLock.toggleLock();
			// var test2 = toggleResult();	

			// if (test1 !== test2) {

			// 	console.log("Test passed, pointer lock toggled");

			// } else {

			// 	console.log("Test failed, pointer lock not toggled");

			// }  // end if test1 !== test2


		} else {

			console.log("Can't run pointerlock test, no pointerLock.lockElement");

		}  // end pointerLock testToggleLock();

		var toggleResult = function () {
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
		};  // end toggleResult
	};  // end testToggleLock()

});
