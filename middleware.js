import { NextResponse } from 'next/server';
import { redis } from './lib/redis'

export default async function middleware(req) {
  
  // get the short url
  const pathname = req.nextUrl.pathname;
  let parts = pathname.split('/');
  let shortUrl = parts[parts.length - 1];


  // load long url from redis for short url
  const longUrl = await redis.hget('links', shortUrl);
  if (longUrl) {
    // short url found
    const validUrl = getValidUrl(longUrl);

    return NextResponse.redirect(validUrl);
  } else {
    // short url NOT fount
    return NextResponse.redirect(req.nextUrl.origin);
  }

  // redurect to the url

}

const getValidUrl = (link) => {
  if (link.indexOf('http://') == 0 || link.indexOf('https://')  == 0) {
    // link has https or http -> return as is
    return link;
  } else {
    return `https://${link}`;
  }
}