import './App.css';
import {useState,useEffect} from 'react';

// API URL
let url = "https://api.quotable.io/random"

function App() {
  const [quote, setQuote] = useState([])
  const [generate,setGenerate] = useState(false)
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    fetch(url).then((response) => {
        if(response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          throw new Error(response.statusText)
        }
    }).then(quote=>{
      setQuote(quote);
    }).catch(err=>console.log(err))
  }, [generate])

  function newQuote(){
    setGenerate(!generate)
    setCount(prevCount => prevCount + 1)
  }

  return (
    <main>
      <div>
        <h1 key={count} className='quote'>"<strong>{quote.content}</strong>"</h1>
        <h3><em>-{quote.author}</em></h3>
      </div>
      <button onClick={newQuote}>Generate New</button>
    </main>
  );
}

export default App;
