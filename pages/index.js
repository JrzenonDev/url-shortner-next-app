import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  
  let [longUrl, setLongUrl] = useState('');
  let [links, setLinks] = useState({});

  const onCreate = async (e) => {
    e.preventDefault();

    console.log(`Make this short: ${longUrl}`);

    const result = axios.post('/api/shorten', { longUrl });
    console.log(result);
  };

  const getLinks = async () => {
    const response = await axios.get('/api/links');
    return response?.data?.links;
  }

  const refreshLinks = async () => {
    const linkObject = await getLinks();
    setLinks(linkObject);
  }

  const onShortUrlClick = (shortUrl) => {
    const url = `http://localhost:3000/go/${shortUrl}`;
    navigator.clipboard.writeText(url).then(
      () => {
        // resolved: Text copied to clipboard
        console.log('Copied link to the clipboard');
      },
      () => {
        // rejected: clipboard failed
        console.log('Could not copy the link to clipboard');
      }
    )
  }

  useEffect(() => {
    (async () => {
      let tmpLinks = await refreshLinks();
      console.log(tmpLinks);
    })();
  }, []);

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
      <div>
        <table>
          <thead>
            <tr>
              <td>Short url</td>
              <td>Original url</td>
            </tr>
          </thead>
          <tbody>
            {Object.keys(links).map((short) => {
              // links in form of { shortUrl: longUrl }, so the sort url is key
              const long = links[short];
              return (
                <tr key={short}>
                  <td
                    onClick={() => onShortUrlClick(short)}
                  >
                    {`http://localhost:3000/go/${short}`}
                  </td>
                  <td>{long}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}