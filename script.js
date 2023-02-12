'use strict';
// select elements from html

const majlisOne = document.querySelector('#majlis-one');
const majlisTwo = document.querySelector('#majlis-two');

const stopOne = document.querySelector('#stop-point-one');
const stopTwo = document.querySelector('#stop-point-two');

const pageOne = document.querySelector('#page-reached-one');
const pageTwo = document.querySelector('#page-reached-two');

const tasksInput = document.querySelector('#tasks-input');
const taskList = document.querySelector('.tasks-list');
const resultField = document.querySelector('.result-field');
const resultBox = document.querySelector('.result-box');

const copyButton = document.querySelector('.copy-button');
const addButton = document.querySelector('.add-button');
const resultButton = document.querySelector('.result-button');
const tasks = [];
let text;
// Functions
const renderTasks = function () {
    taskList.innerHTML = '';
    tasks.forEach((element, index) => {
        const task = document.createElement('li');
        task.innerHTML = element;
        const addedCloseButton = document.createElement('i');
        addedCloseButton.classList.add(
            'close',
            'fa-sharp',
            'fa-solid',
            'fa-square-xmark',
            `id_${index}`
        );
        taskList.appendChild(task);
        task.appendChild(addedCloseButton);
    });
};
const addTasks = function () {
    if (!tasksInput.value.trim()) return;
    tasks.push(tasksInput.value);
    tasksInput.value = '';
    renderTasks();
};
const showResult = function () {
    if (majlisOne.value === 'default' && majlisTwo.value === 'default')
        return alert('اختر مجلسًا');

    if (majlisOne.value !== 'default') {
        if (!stopOne.value.trim())
            return alert('أدخل علامة التوقف للمجلس الأول');
        if (!pageOne.value) return alert('أدخل رقم الصفحة للمجلس الأول');
        text = `💫 مجلس ${majlisOne.value}. توقفنا عند ${stopOne.value}. صــ ${pageOne.value}`;
    }

    if (majlisTwo.value !== 'default') {
        if (!stopOne.value.trim())
            return alert('أدخل علامة التوقف للمجلس الثاني');
        if (!pageOne.value) return alert('أدخل رقم الصفحة للمجلس الثاني');
        text +=
            '\n' +
            `💫 مجلس ${majlisTwo.value}. توقفنا عند ${stopTwo.value}. صــ ${pageTwo.value}`;
    }
    if (tasks.length !== 0) {
        text += '\n' + `مهام المجلس 🎯`;
        for (const [taskNumber, task] of tasks.entries()) {
            text += '\n' + `${replaceNumbers(taskNumber + 1)} ${task} `;
        }
    } else {
        text += '\n' + `لا يوجد مهام`;
    }
    resultBox.innerText = text;
    resultBox.classList.remove('hidden');
    copyButton.classList.remove('hidden');
    resultBox.setAttribute('aria-hidden', 'false');
    copyButton.setAttribute('aria-hidden', 'false');
};

const replaceNumbers = function (num) {
    const Newdigit = [];
    const numbersArray = [
        '0️⃣',
        '1️⃣',
        '2️⃣',
        '3️⃣',
        '4️⃣',
        '5️⃣',
        '6️⃣',
        '7️⃣',
        '8️⃣',
        '9️⃣',
    ];
    const digits = num.toString().split('');
    const realDigits = digits.map(Number);

    for (const digit of realDigits) {
        Newdigit.push(numbersArray[digit]);
    }
    return Newdigit.join('');
};

const copyClipboard = function () {
    navigator.clipboard.writeText(text);
    copyButton.classList.remove('fa-copy', 'fa-solid');
    copyButton.classList.add('fas', 'fa-check', 'check-style');

    setTimeout(() => {
        copyButton.classList.remove('fas', 'fa-check', 'check-style');
        copyButton.classList.add('fa-copy', 'fa-solid');
        
        
    }, 2000);
};

addButton.addEventListener('click', addTasks);

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('close')) {
        const id = e.target.classList[e.target.classList.length - 1];
        const number = id.split('_')[1];
        tasks.splice(number, 1);
        renderTasks();
    }
});
resultButton.addEventListener('click', showResult);

copyButton.addEventListener('click', copyClipboard);
