export const encodeTrackingData = (source: string, medium: string, campaign: string): string => {
    const trackingData = {
        s: source,
        m: medium,
        c: campaign,
        t: Date.now()
    };
    const jsonString = JSON.stringify(trackingData);
    return btoa(jsonString).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

export const decodeTrackingData = (encoded: string) => {
    try {
        const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
        const jsonString = atob(base64);
        return JSON.parse(jsonString);
    } catch (error) {
        console.error('Error decoding tracking data:', error);
        return null;
    }
};