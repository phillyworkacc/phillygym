'use client'
import { getSessionUser, updateAccount, updateAccountImage } from "@/app/actions/user";
import { User } from "@/types/types";
import { useEffect, useState } from "react";

type SessionUserReturned = {
   status: 'no-user' | 'authenticated';
   user: User | null;
   update: ({ name, email }: { name: string, email: string }) => Promise<boolean>;
   updatePicture: (file: File) => Promise<string | false>;
}

export function useSessionUser (): SessionUserReturned {
   const [user, setUser] = useState<SessionUserReturned['user']>(null);
   const [status, setStatus] = useState<SessionUserReturned['status']>('no-user');

   useEffect(() => {
      grabUser();
   }, [])

   async function update ({ name, email }: { name: string, email: string }) {
      const updated = await updateAccount(name, email);
      return updated;
   }

   async function updatePicture (file: File) {
      const updated = await updateAccountImage(file);
      return updated;
   }

   async function grabUser () {
      const sessionUser = await getSessionUser();
      if (sessionUser === null || sessionUser === 'no-session') {
         setUser(null);
         setStatus('no-user');
         return;
      }
      setUser(sessionUser);
      setStatus('authenticated');
   }

   return { user, status, update, updatePicture }
}