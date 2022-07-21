import { NextResponse } from 'next/server';
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
  if (longUrl) {
    // short url found
  } else {
    // short url NOT fount
    return NextResponse.redirect(req.nextUrl.origin)
  }

  // redurect to the url

}