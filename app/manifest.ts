import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'CosyVoiceNext',
        short_name: 'CosyVoiceNext',
        description: 'CosyVoiceNext',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        orientation: 'portrait',
        categories: ['social'],
        icons: [
            {
                src: '/icon.png',
                sizes: '512x512',
                type: 'image/png'
            }
        ]
    }
}