const express = require('express')
const app = express()
const port = 3000

let pageToTurnTo = 1;

app.get('/', (req, res) => res.send(renderPage(pageToTurnTo)))

app.get('/pageToTurnTo', (req, res) => res.send(pageToTurnTo + ''));

app.get('/pageTurn/next', (req, res) => {
  ++pageToTurnTo;
  res.send(renderPage(pageToTurnTo));
});

app.get('/pageTurn/prev', (req, res) => {
  pageToTurnTo = pageToTurnTo < 2 ? 1 : --pageToTurnTo;
  res.send(renderPage(pageToTurnTo))
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const html = (strings, ...exps) =>
  strings.map((str, index) =>
    str + (
      exps[index]
        ? exps[index]
        : ''
    )
  ).join('');


let renderPage = (currentSlide = 0) => html`
<html>
  <head>
  <style>
    h1 {
      font-size: 10rem;
    }
    h2 {
      font-size: 8rem;
    }

    .buttonContainer {
      width: 100vw;
      display: flex;
      justify-content: stretch;
    }

    form {
      padding: 2rem;
    }

    input {
      font-size: 2rem;
      width: 400px;
      height: 400px;
    }
  </style>
  </head>
  <body>
    <h1>Slide Presenter App</h1>

    <h2>Current Slide: ${currentSlide}</h2>

    <div class="buttonContainer">
      <form action="/pageTurn/prev" method="GET">
        <input type="submit" value="Previous" />
      </form>

      <form action="/pageTurn/next" method="GET">
        <input type="submit" value="Next" />
      </form>
    </div>
  </body>
</html>
`
