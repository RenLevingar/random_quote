// Import Statement
import { useState, useEffect } from 'react';

// API URL
let url = "https://api.quotable.io/random"

function App() {
  const [quote, setQuote] = useState({
    content: '',
    author: '',
    length: 0
  }); //quote
  const [generate, setGenerate] = useState(false); //new quote generate
  const [count, setCount] = useState(0); //counter for animation re run
  const maxLength = 150; // the maxium length of the quote

  useEffect(() => {
    fetch(url)
      .then((response) => {
        // Check for a 200 status 
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((quote) => {
        //makes sure that the quote isn't to long
        if (quote.length <= maxLength) {
          setQuote(quote);
        }
      })
      .catch((err) => console.log(err));
  }, [generate, maxLength]);

  // generatees the new quote on button click as well as reruns the animation
  function newQuote() {
    setGenerate(!generate);
    setCount((prevCount) => prevCount + 1);
  }

  return (
    <main>
      <div>
        {quote.content && (
          <>
            <h1 key={count} className='quote'>
              "<strong>{quote.content}</strong>"
            </h1>
            <h3>
              <em>-{quote.author}</em>
            </h3>
          </>
        )}
      </div>
      <button onClick={newQuote}>Generate New</button>
    </main>
  );
}

export default App;

