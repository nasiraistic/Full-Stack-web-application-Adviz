function switchScreens(onId, offId) {
  let turnOn = document.getElementById(onId);
  let turnOff = document.getElementById(offId);
  console.log(onId);
  console.log(offId);
  turnOn.style.display = "block";
  turnOff.style.display = "none";
}

export default switchScreens;
