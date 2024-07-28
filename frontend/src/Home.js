import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Home.css"

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [response, setResponse] = useState('');
  const [pastResponses, setPastResponses] = useState([]);
  const [query, setQuery] = useState('')
  const [output, setOutput] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
   
    const savedResponses = localStorage.getItem('pdfUploaderResponses');
    if (savedResponses) {
      setPastResponses(JSON.parse(savedResponses));
    }
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setResponse('Please select a PDF file first.');
      return;
    }

    const formData = new FormData();
    formData.append('pdfFile', selectedFile);

    try {
      const response = await axios.post('http://127.0.0.1:8080/pdf-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const responseMessage = response.data.message;
      setResponse(responseMessage);
      
      
      const newPastResponses = [...pastResponses, responseMessage];
      setPastResponses(newPastResponses);
      
     
      localStorage.setItem('pdfUploaderResponses', JSON.stringify(newPastResponses));
      
    } catch (error) {
      console.error('Error uploading file:', error);
      let errorMessage = 'An error occurred while uploading the file.';
      if (error.response) {
       
        errorMessage = error.response.data.error || errorMessage;
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      } else if (error.request) {
        
        console.error('No response received:', error.request);
      } else {
        
        console.error('Error setting up request:', error.message);
      }
      setResponse(errorMessage);
    }
  };
  const handleQuerySubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setOutput('');
    axios.post('http://127.0.0.1:8080/chatbot', {query: query})
      .then((res) => {
        setOutput(res.data.response || JSON.stringify(res.data));
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setOutput('An error occurred while processing your query.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  return (
    <div className='center'>
    <div className="pdf-uploader">
      <div className="file-input-container">
        <input type="file" onChange={handleFileChange} accept=".pdf" className="file-input" id="pdf-file" />
        <button onClick={handleSubmit} className="button">Submit</button>
        <button onClick={() => document.getElementById('pdf-file').click()} className="button browse">Browse</button>
      </div>
      
      {selectedFile && <span className="file-name">Selected file: {selectedFile.name}</span>}
      
      {response && (
        <div className="response-container">
          <h3>Response:</h3>
          <p className="response-message">{response}</p>
          
        </div>
        
      )}
      
                    
                
      <div>
        <form className="fr1" onSubmit={handleQuerySubmit}>
          <input
            type='text'
            className='fr2'
            placeholder='Enter your query'
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
          />
          <button 
            className="button browse submit" 
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Submit'}
          </button>
        </form>
        {isLoading && <div className="loader">Loading...</div>}
        {output && (
          <div className='response-message'>
            <div className="chat-bubble right">
              <div className="message" ng-bind-html="message.text | nl2br" autolinker>
              </div>
              <div className="message-detail">
                <span ng-click="viewProfile(message)" className="bold">{output}</span> 
                <span am-time-ago="message.date"></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
    
  );
};

export default Home;