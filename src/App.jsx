import './App.css';
import {useState,useEffect} from 'react';

let url = "https://api.quotable.io/random"

function App() {
  const [quote, setQuote] = useState([])
  const [generate,setGenerate] = useState(false)
  
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
  }

  return (
    <main>
      <div>
        <h1 className='quote'>"<em>{quote.content}</em>"</h1>
        <h1>-{quote.author}</h1>
      </div>
      <button onClick={newQuote}>Generate New</button>
    </main>
  );
}

export default App;
