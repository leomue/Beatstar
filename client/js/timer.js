function Timer(callbacks, step) {
  var last = 0;
  var active=false;
      var acc = 0;
      var tick = 0;
      var inc = step || 1/120;
      var frameId;

  function onFrame(time) {
    if (last !== null) {
      acc = acc + (time - last) / 1000;
      while (acc > inc) {
        callbacks.update(inc, tick);
        tick = tick + 1;
        acc = acc - inc;
      }
    }
    last = time;
    callbacks.render();
if (active)     frameId = requestAnimationFrame(onFrame);
  }

  function start() {
    last = null;
    active=true;
    frameId = requestAnimationFrame(onFrame);
  }

  function stop() {
    active=false;
    cancelAnimationFrame(frameId);
    console.log(frameId);
  }
function change(value) {
  inc =value|| 1/120;
  acc=inc;
  tick=0;
  stop();
  start();
}
  return {
    start: start,
    stop: stop,
    change: change,
  };
}

module.exports = Timer;
