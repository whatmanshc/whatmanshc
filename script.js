const TOTAL_QUESTIONS = 10; // จำนวนคำถามที่จะแสดง

let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = [];

// ฟังก์ชันในการสุ่มคำถาม
function shuffleQuestions() {
    const shuffled = questions.sort(() => 0.5 - Math.random());
    shuffledQuestions = shuffled.slice(0, TOTAL_QUESTIONS);
}

// ฟังก์ชันในการโหลดคำถาม
function loadQuestion() {
    if (currentQuestionIndex >= shuffledQuestions.length) {
        showScore();
        return;
    }
    
    const questionContainer = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options-container');
    
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    
    optionsContainer.innerHTML = '';
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });
}

// ฟังก์ชันในการตรวจสอบคำตอบ
function checkAnswer(selectedOption) {
    const correctAnswer = shuffledQuestions[currentQuestionIndex].answer;
    if (selectedOption === correctAnswer) {
        score++;
        alert('ถูกต้อง!');
    } else {
        alert('ผิด! คำตอบที่ถูกต้องคือ ' + correctAnswer);
    }
    document.getElementById('next-button').disabled = false;
}

// ฟังก์ชันในการแสดงคะแนน
function showScore() {
    const scoreContainer = document.getElementById('score-container');
    scoreContainer.textContent = `คุณได้คะแนน ${score} จาก ${TOTAL_QUESTIONS} คำถาม`;
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('next-button').style.display = 'none';
}

// ฟังก์ชันในการเริ่มเกม
function startGame() {
    shuffleQuestions();
    loadQuestion();
}

// ฟังก์ชันในการโหลดคำถามถัดไป
document.getElementById('next-button').onclick = () => {
    currentQuestionIndex++;
    loadQuestion();
    document.getElementById('next-button').disabled = true;
};
// สร้างเสียงสำหรับคำตอบถูกและผิด
const correctSound = new Audio('correct.mp3');
const incorrectSound = new Audio('incorrect.mp3');

// ฟังก์ชันในการตรวจสอบคำตอบ
function checkAnswer(selectedOption) {
    const correctAnswer = shuffledQuestions[currentQuestionIndex].answer;
    const optionsContainer = document.getElementById('options-container');
    const buttons = optionsContainer.querySelectorAll('button');

    // ปิดการทำงานของปุ่มทุกปุ่ม
    buttons.forEach(button => {
        button.disabled = true;
    });

    if (selectedOption === correctAnswer) {
        score++;
        correctSound.play();  // เล่นเสียงถูก
        alert('ถูกต้อง!');
    } else {
        incorrectSound.play();  // เล่นเสียงผิด
        alert('ผิด! คำตอบที่ถูกต้องคือ ' + correctAnswer);
    }

    document.getElementById('next-button').disabled = false;
}



// เริ่มเกม
startGame();
