import { redirectUnauthorized } from '@/helpers/redirects'
import TrackingPage from './TrackingPage';

export default async function page() {
   await redirectUnauthorized();
   return <TrackingPage />
}
