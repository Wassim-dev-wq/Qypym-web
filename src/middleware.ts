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
                const response = NextResponse.redirect(new URL('/', request.nextUrl));
                response.cookies.set('tracking_data', JSON.stringify(trackingData));
                return response;
            }
        } catch (error) {
            console.error('Middleware error:', error);
        }
    }
    return NextResponse.next();
}
