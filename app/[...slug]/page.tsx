import { redirect } from 'next/navigation';

/**
 * Redirects any unmatched route back to the home page instead of serving a 404.
 */
export default function CatchAllRedirectPage() {
  redirect('/');
}

