import { redirectUnauthorized } from '@/helpers/redirects'
import { getFullUserProfile } from '@/app/actions/user';
import FullUserProfile from './FullUserProfile';
import sanitise from '@/utils/sanitise';

type FullUserProfilePage = {
   params: Promise<{
      userid: string;
   }>
}

export default async function page ({ params }: FullUserProfilePage) {
   await redirectUnauthorized();

   const { userid } = await params;
   const fullUserProfile = await getFullUserProfile(userid);

   if (fullUserProfile == false) return null;

   return <FullUserProfile fullUserProfile={sanitise(fullUserProfile)} />
}
