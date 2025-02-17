import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decodeTrackingData } from '@/lib/linkEncoder';

const aliasMapping: Record<string, Record<string, string>> = {
    'nouvelle-ere': {
        utm_source: 'instagram',
        utm_medium: 'social',
        utm_campaign: 'waitlist',
    },
};

export const config = {
    matcher: ['/r/:path*']
};

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    if (pathname.startsWith('/r/')) {
        try {
            const aliasOrEncoded = pathname.slice(3);
            let trackingData = aliasMapping[aliasOrEncoded];
            if (!trackingData) {
                trackingData = decodeTrackingData(aliasOrEncoded);
            }
            if (trackingData) {
                const cookieData = {
                    s: trackingData.utm_source,
                    m: trackingData.utm_medium,
                    c: trackingData.utm_campaign,
                };
                const response = NextResponse.redirect(new URL('/', request.nextUrl));
                response.cookies.set('tracking_data', JSON.stringify(cookieData), {
                    httpOnly: true,
                    path: '/',
                });
                return response;
            }
        } catch (error) {
            console.error('Middleware error:', error);
        }
    }
    return NextResponse.next();
}