'use strict';
class GameUtils {
progressPan(current, max) {
return ((current*200/max)-100)/100;
}
progressPitch(current,max) {
return ((current*200/max))/100;
}
	distance3D(x1, y1, z1, x2, y2, z2) {
		return Math.sqrt((x2 - x1) * (x2 - x1) +
(y2 - y1) * (y2 - y1) +
(z2 - z1) * (z2 - z1));
	}

	distance(jx, jy, kx, ky) {
	// Return Math.hypot(jx-kx, jy-ky)
		return Math.sqrt(((jx - kx) * (jx - kx)) + ((jy - ky)) * (jy - ky));
	}

	calculateAngle(x1, y1, x2, y2) {
		let angle = Math.atan2((y2 - y1), (x2 - x1));
		angle = (angle >= 0) ? 0 : (2 * Math.PI) + angle;
		return angle;
	// Return Math.atan2((y2 - y1),(x2 - x1));
	}

	isCollide3D(a, b) {
		return (a.x <= (b.x + b.width) && (a.x + a.width) >= b.x) && (a.y <= (b.y + b.height) && (a.y + a.height) >= b.y) && (a.z <= (b.z + b.depth) && (a.z + a.depth) >= b.z);
	}

	randomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	getRandomArbitrary(min, max) {
		return Math.random() * (max - min) + min;
	}

	sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	percent(int1, int2) {
		return int1 * 100 / int2;
	}
}
export var utils = new GameUtils();
