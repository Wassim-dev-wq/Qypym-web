import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decodeTrackingData } from '@/lib/linkEncoder';

export const config = {
    matcher: ['/r/:path*']
};

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    if (pathname.startsWith('/r/')) {
        try {
            const encodedData = pathname.slice(3);
            const trackingData = decodeTrackingData(encodedData);
            if (trackingData) {
                const url = new URL('/', request.nextUrl);
                url.searchParams.set('utm_source', trackingData.s);
                url.searchParams.set('utm_medium', trackingData.m);
                url.searchParams.set('utm_campaign', trackingData.c);
                return NextResponse.redirect(url);
            }
        } catch (error) {
            console.error('Middleware error:', error);
        }
    }
    return NextResponse.next();
}