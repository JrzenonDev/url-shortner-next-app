import { redis } from './lib/redis'

export default async function middleware(req) {
  console.log('middleware');
  
  // get the short url
  const pathname = req.nextUrl.pathname;
  console.log('pathname: ', pathname);
  let parts = pathname.split('/');
  let shortUrl = parts[parts.length - 1];


  // load long url from redis for short url
  const longUrl = await redis.hget('links', shortUrl);
  console.log(longUrl);

  // redurect to the url

}