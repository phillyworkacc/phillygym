'use client'
import './Table.css'
import { formatMilliseconds } from '../../utils/date';
import { CustomUserIcon } from '../Icons/Icon';
import { User } from '@/types/types';

type UsersTableProps = {
   users: User[];
   onClickUser?: (user: User) => void;
}

export default function UsersTable ({ users, onClickUser }: UsersTableProps) {
   return (
      <div className="video-ideas-manage">
         <div className="table-container">
            <table className="video-idea-table">
               <thead>
                  <tr id='head-row'>
                     <th>Name</th>
                     <th style={{textAlign:"center"}}>Email</th>
                     <th style={{textAlign:"center"}}>Premium</th>
                     <th style={{textAlign:"center"}}>Type</th>
                     <th style={{textAlign:"center"}}>Suspended</th>
                     <th style={{textAlign:"center"}}>Banned</th>
                     <th style={{textAlign:"center"}}>Date Joined</th>
                  </tr>
               </thead>
               <tbody>
                  {users.map((user, index) => (
                     <tr key={index} onClick={() => { if (onClickUser) onClickUser(user); }}>
                        <td className='name'>
                           <div className="box fit dfb align-center gap-10">
                              <CustomUserIcon url={user.profileImage!} size={25} round />
                              {user.name}
                           </div>
                        </td>
                        <td style={{textAlign:"center"}}>{user.email}</td>
                        <td style={{textAlign:"center"}}>{user.premiumAccess ? "Premium" : "Not Premium"}</td>
                        <td style={{textAlign:"center"}}>{user.type}</td>
                        <td style={{textAlign:"center"}}>{user.suspended ? "Suspended" : "Not Suspended"}</td>
                        <td style={{textAlign:"center"}}>{user.banned ? "Banned" : "Not Banned"}</td>
                        <td style={{textAlign:"center"}}>{formatMilliseconds(parseInt(user.joined!), true, true)}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   )
}