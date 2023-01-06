const word_el = document.getElementById("word");
const popup = document.getElementById("popup-container");
const message_el = document.getElementById("success-messege");
const wrongLetters_el = document.getElementById("wrong-letters");
const question_el = document.getElementById("question");
const words = ["java", "c#", "sql"];
const questions = ["soru1","soru2","soru3"]
const correctLetters = [];
const wrongLetters = [];
const getRandom = Math.floor(Math.random() * questions.length);
const selectedQuestion = getQuestion();
const items = document.querySelectorAll('.item');
const message = document.getElementById("message");
const PlayAgainBtn = document.getElementById('play-again');



function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

const getRandomQuestionWord = () => {
  const word = words.find((el, idx) => {
   if(idx === getRandom){
    return el;
   }
  })
  return word;
}

function getQuestion(){
  return questions[getRandom]
}

let selectedWord2 = getRandomQuestionWord();

function displayQuestion(){
  question_el.innerHTML = 
  `<div id="ques"> ${selectedQuestion} </div>`
}

function displayWord() {
  word_el.innerHTML = `
    ${selectedWord2
      .split("")
      .map(
        (letter) => `
    <div class ="letter">
        ${correctLetters.includes(letter) ? letter : ""}
    </div>
    `
      )
      .join("")}
    
    `;

  const w = word_el.innerText.replace(/\n/g, "");
  if (w === selectedWord2) {
    popup.style.display = "flex";
    message_el.innerText = "Tebrikler kelimeyi doğru bildiniz.";
  }
}

function wrongWordLetters() {
  wrongLetters_el.innerHTML = `
    ${wrongLetters.length > 0? '<h3>Hatalı Harfler</h3>':''}
    ${wrongLetters.map(letter=> `<span> ${letter} <span> `)}
    `;

    items.forEach((item,index) => {
      const errorCount = wrongLetters.length;

      if(index < errorCount){
        item.style.display = 'block'
      }else{
        item.style.display = 'none'
      }

    });

    if (wrongLetters.length === items.length) {
      popup.style.display = "flex";
      message_el.innerText = "Kaybettiniz.";
    }
}

function displayMessage() {    
  message.classList.add('show');

  setTimeout(function() {
      message.classList.remove('show');
  }, 2000);
}

PlayAgainBtn.addEventListener('click', function() {
  window.location.reload();
});


window.addEventListener("keydown", function (e) {
  if (e.keyCode >= 65 && e.keyCode <= 230) {
    const letter = e.key;

    if (selectedWord2.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        displayMessage();
       
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        wrongWordLetters();
      }
      else{
        displayMessage();
      }
    }
  }
});

displayWord();
displayQuestion();
getRandomQuestionWord();