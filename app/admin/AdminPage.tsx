'use client'
import AppWrapper from "@/components/AppWrapper/AppWrapper"
import Spacing from "@/components/Spacing/Spacing"
import UsersTable from "@/components/Table/UsersTable"
import { Heading, SubHeading } from "@/components/CourseFormats/CourseFormats"
import { User } from "@/types/types"
import { useRouter } from "next/navigation"

export default function AdminPage ({ users }: { users: User[] }) {
   const router = useRouter();

   return (
      <AppWrapper>
         <Heading>Admin Dashboard</Heading>
         <SubHeading>See all members of PhillyGym</SubHeading>
         <Spacing />
         <UsersTable 
            users={users}
            onClickUser={user => router.push(`/admin/user/${user.userid}`)}
         />
      </AppWrapper>
   )
}
