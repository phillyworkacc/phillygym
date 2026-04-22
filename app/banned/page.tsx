import AppWrapper from '@/components/AppWrapper/AppWrapper'
import { Heading, SubHeading } from '@/components/CourseFormats/CourseFormats'
import { getSessionUser } from '../actions/user';

export default async function BannedPage () {
   const sessionUser = await getSessionUser();
   if (sessionUser === "no-session") return null;
   if (sessionUser === null) return null;
   if (!sessionUser.banned) return null

   return (
      <AppWrapper>
         <Heading>You have been banned!</Heading>
         <SubHeading>You cannot access the community</SubHeading>
      </AppWrapper>
   )
}
