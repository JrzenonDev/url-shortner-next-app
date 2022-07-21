import { useState, useEffect } from 'react';
import axios from 'axios';

const styles = {
  h1: {
    textTransform: 'uppercase',
  },
  container: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  textInput: {
    width: '100%',
    padding: '8px 5px',
    fontSize: '1.2em',
  },
  saveButton: {
    padding: '10px 5px',
    width: '100%',
    margin: '5px 0 0 0',
    fontSize: '1.2em'
  },
  table: {
    width: '100%',
    margin: '30px 0 0 0',
  },
  tableHeader: {
    fontWeight: 'bold',
  },
  tableShortUrlCell: {
    padding: '5px 20px 5px 0',
    width: '50%',
    cursor: 'pointer',
  },
}

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
        console.log('Copied link to the clipboard', url);
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
    <div style={styles.container}>
      <h1 style={styles.h1}>Url Shortner</h1>
      <div>
        <input
          type='text'
          placeholder='Enter a short a url'
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          style={styles.textInput}
        />
        <button onClick={onCreate} style={styles.saveButton}>Make it short</button>
      </div>
      <div>
        <table style={styles.table}>
          <thead>
            <tr>
              <td style={styles.tableHeader}>Short url</td>
              <td style={styles.tableHeader}>Original url</td>
            </tr>
          </thead>
          <tbody>
            {Object.keys(links).map((short) => {
              // links in form of { shortUrl: longUrl }, so the sort url is key
              const long = links[short];
              return (
                <tr key={short}>
                  <td
                    style={styles.tableShortUrlCell}
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