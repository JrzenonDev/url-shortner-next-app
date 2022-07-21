export default async function middlewere(req) {

  // get the short url
  const pathname = req.nextUrl.pathname;
  let parts = pathname.split('');
  let shortUrl = parts[parts.length - 1];


  // load long url from redis for short url

  // redurect to the url

}