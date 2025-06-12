const colors = [
  { telugu: "ఎరుపు", image: "https://tse4.mm.bing.net/th?id=OIP.fVHb4Bfn60eeBnA8_yoACAHaE8&pid=Api&P=0&h=180", sound: "sounds/red.mp3" },
  { telugu: "ఆకుపచ్చ", image: "https://tse1.mm.bing.net/th?id=OIP.NRwIf5ycx0oxU8WNt_oq6QHaH3&pid=Api&P=0&h=180", sound: "sounds/green.mp3" },
  { telugu: "పసుపు", image: "https://tse4.mm.bing.net/th?id=OIP.qWz_7--r3v447LHVzbCIwwHaDt&pid=Api&P=0&h=180", sound: "sounds/yellow.mp3" },
  { telugu: "పింక్", image: "https://tse4.mm.bing.net/th?id=OIP.8sBMpwspy4IiKUZ7sJ0oFgHaE8&pid=Api&P=0&h=180", sound: "sounds/pink.mp3" },
  { telugu: "నీలం", image: "https://tse4.mm.bing.net/th?id=OIP.mNshQ4Kr-_ymn-1dMeOsdwHaE8&pid=Api&P=0&h=180", sound: "sounds/blue.mp3" }
];
let score = 0;
let timeLeft = 30;
let currentColor = null;
let timer = null;
const welcome = document.getElementById("welcome");
const home = document.getElementById("home");
const game = document.getElementById("game");
const gameover = document.getElementById("gameover");
const scoreLabel = document.getElementById("scoreLabel");
const timeLabel = document.getElementById("timeLabel");
const finalScore = document.getElementById("finalScore");
const colorImage = document.getElementById("colorImage");
const optionsDiv = document.getElementById("options");
const result = document.getElementById("result");
const sound = document.getElementById("colorSound");
const bgMusic = document.getElementById("bgMusic");
const gameOverSound = document.getElementById("gameOverSound");
function goHome() {
  welcome.style.display = "none";
  home.style.display = "block";
}
function startGame() {
  score = 0;
  timeLeft = 30;
  home.style.display = "none";
  gameover.style.display = "none";
  game.style.display = "block";
  updateUI();
  startTimer();
  nextQuestion();
  bgMusic.currentTime = 0;
  bgMusic.play();
}
function updateUI() {
  scoreLabel.innerText = `స్కోరు: ${score}`;
  timeLabel.innerText = `సమయం: ${timeLeft} సెకండ్లు`;
}
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    updateUI();
    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}
function showAbout() {
  gameover.style.display = "none";
  about.style.display = "block";
}
function goHome() {
  welcome.style.display = "none";
  home.style.display = "block";
  about.style.display = "none";
}
function nextQuestion() {
  currentColor = colors[Math.floor(Math.random() * colors.length)];
  colorImage.src = currentColor.image;
  sound.src = currentColor.sound;
  sound.play();
  let options = [currentColor.telugu];
  while (options.length < 3) {
    let wrong = colors[Math.floor(Math.random() * colors.length)].telugu;
    if (!options.includes(wrong)) {
      options.push(wrong);
    }
  }
  options = options.sort(() => Math.random() - 0.5);
  optionsDiv.innerHTML = '';
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(opt);
    optionsDiv.appendChild(btn);
  });
}
function checkAnswer(selected) {
  if (selected === currentColor.telugu) {
    score++;
    result.innerText = "✅ సరైన ఎంపిక!";
  } else {
    result.innerText = "❌ తప్పు ఎంపిక!";
  }
  updateUI();
  setTimeout(() => {
    result.innerText = "";
    nextQuestion();
  }, 800);
}
function endGame() {
  game.style.display = "none";
  gameover.style.display = "block";
  finalScore.innerText = `మీ స్కోరు: ${score}`;
  bgMusic.pause();
  gameOverSound.play();
}
function restartGame() {
  gameover.style.display = "none";
  startGame();
}
