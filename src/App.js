import { Button, Icon } from 'semantic-ui-react';
import { Dimmer, Loader } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import React , { useEffect, useState } from 'react';
import axios from 'axios';

const App = () =>  {


const [qoute, setQoute] = useState('');
const [author, setAuthor] = useState('');
const [loading, setLoading] = useState(false);



// for calling quote Api
const fetchQoute = async () => {

let arrayofQoutes = [] ;

try {
setLoading(true);
  // calling proxy api for avoidning cors issues
  const proxyUrl ='https://cors-anywhere.herokuapp.com/';
  const qouteUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  const data = await axios.get(proxyUrl + qouteUrl); 
  console.log(data)

  arrayofQoutes = data.data;

 
} catch(error) {

  console.log(error);

}

try {
  setLoading(false)
  setQoute(arrayofQoutes.quoteText);
  
  setAuthor(arrayofQoutes.quoteAuthor);

} catch(error) 

{
  console.log(error);
}
  
};

// for twitter button
const tweetQuote = () => {

  const twitterUrl = `https://twitter.com/intent/tweet?text=${qoute} - ${author}`;
  window.open(twitterUrl, '_blank');

}

useEffect(() => {

  fetchQoute();

},[])
   

  return (
    <div className='quote-container'> 
    {
      loading ? (
        <Dimmer active inverted>
        <Loader inverted >Loading</Loader>
        </Dimmer>
      ) :
      (
        <div>
            <div className='quote-text'>
              <i className='fas fa-quote-left' ></i>
              <span id="quote">{qoute}</span>
            </div>
            <div className='quote-author'>
              <span id="author">{author ? author : 'Unknown'}</span>
            </div>
          <div className='button-container'>
            <Button color='twitter' onClick={tweetQuote} >
              <Icon name='twitter' /> Tweet this
            </Button>
            <Button  secondary onClick={fetchQoute}>New Qoute</Button>
          </div>
        </div>
      )
    }
    
      
      
     
      
    </div>
  );
}

export default App;
