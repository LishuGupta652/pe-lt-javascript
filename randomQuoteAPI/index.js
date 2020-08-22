//Event Listeners
document.getElementById('nextQuote').addEventListener('click', getQuote);
document.getElementById('twitter').addEventListener('click', addLink);

//Globals
var currentPost = document.getElementById('quote').innerText;
var currentAuthor = document.getElementById('author').innerText;
//Random Colors
var colors = ['#00a8ff' , '#9c88ff', '#fbc531', '#4cd137', '#487eb0', '#0097e6', '#e84118', '#7f8fa6', '#2f3640', '#273c75', '#f5f6fa', '#2C3A47', '#FC427B', '#55E6C1']

//Set Colors 
function setColor(){
    var randColor = Math.floor(Math.random() * colors.length);
    document.body.style.backgroundColor = colors[randColor];
    document.getElementById('nextQuote').style.backgroundColor = colors[randColor]
}

// POst requrest from fetch API
// fetch('http://localhost:8083/students/', {
//     method: 'POST',
//     headers: {
//     'Accept': 'application/json'
//   },
//     body: data
//   })
//     .then(function(response) {
//         return response.json()
//       }).then(function(body) {
//         console.log(body);
//       });
//   }

//Getting Data from the API
function getQuote() {

    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
    .then( res => res.json())
    .then( data => {
        
        //getting a random quotes from 100 quotes 
        var randQuote = Math.floor(Math.random() * 100)

        currentPost = data['quotes'][randQuote].quote;  
        currentAuthor = data['quotes'][randQuote].author;
        
        //Changing background color 
        setColor();


        // Visualizing the data in the DOM 
        document.getElementById('quote').innerHTML = currentPost;
        document.getElementById('author').innerHTML = currentAuthor;

        
        
    })
}

function addLink() {
    openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=LishuGupta&text=' + encodeURIComponent('"' + currentPost + '" ' + currentAuthor))
}

function openURL(url) {
    window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}

//EncodeURIComponent
// console.log('https://twitter.com/intent/tweet?hashtags=quotes&related=LishuGupta&text=' + encodeURIComponent('"' + currentPost + '" ' + currentAuthor))
