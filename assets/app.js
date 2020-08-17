function generatePassword (el) {
  el = document.getElementById(el);
  el.value = randomPass();
}
function randomPass () {
  return Math.random().toString(25).slice(-8);
}