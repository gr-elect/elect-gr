import { NextResponse } from 'next/server';

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap location
Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'}/sitemap.xml

# Crawl-delay (optional)
Crawl-delay: 1
`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}