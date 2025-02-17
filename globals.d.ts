interface Window {
    gtag: (
        command: string,
        action: string,
        params: {
            utm_source?: string;
            utm_medium?: string;
            utm_campaign?: string;
            [key: string]: string | undefined;
        }
    ) => void;
}