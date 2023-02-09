const testFunction = function () {
    const myVar = document.querySelector('#page-reached-two').value;
    console.log(myVar);
}

document.querySelector('.result-button').addEventListener('click', testFunction);