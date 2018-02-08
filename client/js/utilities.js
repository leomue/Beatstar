'use strict';
class GameUtils {
distance3D(x1, y1, z1, x2, y2, z2) {
	return Math.sqrt((x2-x1)*(x2-x1) + 
(y2-y1)*(y2-y1) + 
(z2-z1)*(z2-z1));
}
distance(jx, jy, kx, ky) {
	//return Math.hypot(jx-kx, jy-ky)
	return Math.sqrt(((jx - kx) * (jx - kx)) + ((jy - ky)) * (jy - ky))
}

calculateAngle(x1, y1, x2, y2) {
	var angle = Math.atan2((y2-y1), (x2-x1));
	angle = (angle >= 0) ? 0 : (2*Math.PI) + angle;
	return angle;
	// return Math.atan2((y2 - y1),(x2 - x1));
}
isCollide3D(a, b)
{
	return(a.x <= (b.x+b.width) && (a.x+a.width) >= b.x)&&(a.y <= (b.y+b.height) && (a.y+a.height) >= b.y)&&(a.z <= (b.z+b.depth) && (a.z+a.depth) >= b.z);
}
randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomArbitrary(min, max) {
return Math.random() * (max - min) + min;
  }
}
export var utils=new GameUtils();