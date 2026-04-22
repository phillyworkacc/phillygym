import { redirectUnauthorized } from '@/helpers/redirects'
import WorkoutsPage from './WorkoutsPage';

export default async function page() {
   await redirectUnauthorized();
   return <WorkoutsPage />
}
