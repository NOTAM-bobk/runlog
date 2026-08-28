import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'RunLog — Your training, clearly logged',
    short_name: 'RunLog',
    description: 'A focused weekly running log powered by Garmin snapshots.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f3f4ec',
    theme_color: '#f3f4ec',
    orientation: 'portrait',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' },
    ],
  };
}
