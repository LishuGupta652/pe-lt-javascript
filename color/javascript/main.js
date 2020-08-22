const changeBackground = () => {
  colors = ["red", "blue", "green", "rgba(100, 100, 100, 0.9)"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  console.log(randomColor);
  document.body.style.backgroundColor = randomColor;
};

const changeHex = () => {
  colors = [1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
  var hexColor = "#";
  for (let i = 0; i < 6; i++) {
    hexColor += colors[Math.floor(Math.random() * colors.length)];
  }
  document.getElementById("colorText").innerHTML = hexColor;
  console.log(hexColor);
  document.body.style.backgroundColor = hexColor;
};
