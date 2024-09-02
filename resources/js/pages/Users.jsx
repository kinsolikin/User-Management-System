import React from 'react'
import Layout from '../components/Layout/Layout'
import { usePage } from '@inertiajs/react'
function Users() {

const {users} = usePage().props

console.log(users)
  return (
   

    <table class=" ml-20 items-center justify-center table-auto max-w-10 bg-white border ">
    <thead>
    
      <tr>
        <th  class=" px-6 py-2 border-b">name</th>
        <th class="px-6 py-2 border-b">email</th>
        
        <th class="px-6 py-2 border-b" >email_verified_at</th>
      </tr>
    </thead>
    <tbody>
        {users.map((user)=>(

          <tr>
        <td class="px-6 py-2 border-b break-words">{user.name}</td>
        <td class="px-6 py-2 border-b break-words" >{user.email}</td>
        {user.email_verified_at && (
          <td class="px-6 py-2 border-b break-words" ><span class="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
        Verified
      </span></td>
        ) || (
          <td class="px-6 py-2 border-b break-words" ><span class="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
          Not verified yet
        </span></td>
        )}
      </tr>
        ))}
    
    </tbody>
  </table>
        
  )
}


Users.layout = page => <Layout mainmenu={page} title="Welcome" />
export default Users
