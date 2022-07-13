export default async function handler(req, res) {
  // get longUrl from body
  const { longUrl } = req.body;
  if (!longUrl || longUrl.length <= 0) {
    res.status(400).json({ status: 'Error: url not set.' })
    return;
  }

  // generate short url
  const shortUrl = makeShortUrl(4);

  // save to redis
}

const makeShortUrl = (length) => {
  var result = '';
  var characters = 
    'ABCDEFGHIJKLMNOPQRSTUVWYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result;
}