import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  
  let [longUrl, setLongUrl] = useState('');
  const onCreate = async (e) => {
    e.preventDefault();

    console.log(`Make this short: ${longUrl}`);

    const result = axios.post('/api/shorten', { longUrl });
    console.log(result);
  }

  return (
    <div>
      <h1>Url Shortner</h1>
      <div>
        <input
          type='text'
          placeholder='Enter a short a url'
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button onClick={onCreate}>Make it short</button>
      </div>
    </div>
  )
}