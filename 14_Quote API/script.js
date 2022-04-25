const quote = document.querySelector('#quote');
const author = document.querySelector('#author');
var indicator = 0;
var quoteNode = [];
var authorNode = [];
var aLimit = 0;
var qLimit = 0;
var authorInterval = null;
var quoteInterval = null;
var flag = false;

window.addEventListener('load', generateQuote);


function generateQuote() {
    const url = "https://programming-quotes-api.herokuapp.com/Quotes/random"

    fetch(url)

    .then(response =>{
        if(response.ok)
            return response.json();
        else
            alert(response.status);
    })

    .then(data =>{
        var text = data['en'];
        var author = data['author'];

        qLimit = text.length;
        aLimit = author.length;

        for (let i = 0; i < text.length; i++) {
            quoteNode[i] = text.substr(i,1);
        }
        for (let i = 0; i < author.length; i++) {
            authorNode[i] = author.substr(i,1);
        }

        quoteInterval = setInterval(typeQuote, 40); 
    })
}

function typeQuote(){
    quote.innerHTML += quoteNode[indicator];
    indicator++;

    if(indicator == qLimit){
        authorInterval = setInterval(typeAuthor, 50);
        clearInterval(quoteInterval);
        indicator = 0;
    }
}

function typeAuthor() {
    author.innerHTML += authorNode[indicator];
    indicator++;

    if(indicator == aLimit){
        clearInterval(authorInterval);
        resetTimer();
    }
}

function resetTimer() 
{
    setTimeout(() => {
    quote.innerHTML = "";
    author.innerHTML = '';
    quoteNode = [];
    authorNode = [];
    indicator = 0;
    generateQuote();
    }, 5000);
}