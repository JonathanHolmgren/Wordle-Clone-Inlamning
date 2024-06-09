let startTime;

function startWatch() {
  startTime = Date.now();
}

function stopWatch() {
  const sek = Date.now() - startTime;
  startTime = null;
  return sek / 1000;
}

export { startWatch, stopWatch };
