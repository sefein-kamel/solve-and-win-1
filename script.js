const quizData = [
    {
    question: "من هو أول السواح ؟",
    options: ["الأنبا بولا", "الأنبا أنطونيوس", "الأنبا شنودة", "الأنبا مكاريوس"],
    correct: "الأنبا بولا"
    },
    {
    question: "من هو أول إنسان دخل الفردوس ؟",
    options: ["آدم", "نوح", "اللص اليمين", "إبراهيم"],
    correct: "اللص اليمين"
    },
    {
    question: "من هو أول ملك على شعب بني إسرائيل ؟",
    options: ["داود", "سليمان", "صموئيل", "شاول"],
    correct: "شاول"
    },
    {
    question: "من هو أول شهيد من شهداء المسيحية ؟",
    options: ["بطرس", "إسطفانوس", "بولس", "يوحنا"],
    correct: "إسطفانوس"
    },
    {
    question: "من هو أول من قام بالسجود لملك الملوك ؟",
    options: ["المجوس", "الرعاة", "يوحنا المعمدان", "التلاميذ"],
    correct: "يوحنا المعمدان"
    }
];

let currentIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");

function loadQuestion() {
    const current = quizData[currentIndex];
    questionEl.innerText = current.question;
    optionsEl.innerHTML = "";

    current.options.forEach(option => {
    const label = document.createElement("label");
    label.innerHTML = `
        <input type="radio" name="answer" value="${option}"> ${option}
    `;
    optionsEl.appendChild(label);
    });
}

nextBtn.addEventListener("click", () => {
    const selectedOption = document.querySelector('input[name="answer"]:checked');

    if (!selectedOption) {
    alert("Please select an answer  !  رجاءاً اختر اجابة");
    return;
    }

    const userAnswer = selectedOption.value;
    if (userAnswer === quizData[currentIndex].correct) {
    score++;
    }

    currentIndex++;

    if (currentIndex < quizData.length) {
    loadQuestion();
    } else {
    showResult();
    }
});

function copyCode() {
    const codeText = document.getElementById("secretCode").innerText;
    navigator.clipboard.writeText(codeText);
    showMessage("تم نسخ الرقم");
}

function showMessage(msg) {
    let messageBox = document.getElementById("messageBox");

    if (!messageBox) {
        messageBox = document.createElement("div");
        messageBox.id = "messageBox";
        messageBox.style.marginTop = "10px";
        messageBox.style.color = "green";
        messageBox.style.fontSize = "16px";
        resultEl.appendChild(messageBox);
    }

    messageBox.innerText = msg;

    setTimeout(() => {
        messageBox.innerText = "";
    }, 2000);
}

function reloadQuiz() {
    location.reload();
}

function showResult() {
    questionEl.style.display = "none";
    optionsEl.style.display = "none";
    nextBtn.style.display = "none";

    resultEl.innerHTML = "";

    if (score === quizData.length) {
        const code = "01226098972";

        resultEl.innerHTML = `
            <p>رائع إجاباتك كلها صحيحة</p>
            <p>مبروك أتصل بالرقم بسرعة</p>
            <p id="secretCode">${code}</p>
            <button onclick="copyCode()">نسخ الرقم</button>
        `;
    } else {
        resultEl.innerHTML = `
            <p>للأسف نتيجتك ${score} من ${quizData.length}</p>
            <button onclick="reloadQuiz()">حاول مجدداً</button>
        `;
    }
}


loadQuestion();