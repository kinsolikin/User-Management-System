import React from 'react'
import Layout from '../components/Layout/Layout'
import { usePage } from '@inertiajs/react'
function Users() {

const {users} = usePage().props

console.log(users)
  return (
    <table class="table-auto max-w-10 bg-white border mr-20">
    <thead>
      <tr>
        <th  class=" px-6 py-2 border-b">name</th>
        <th class="px-6 py-2 border-b">email</th>
        
        <th class="px-6 py-2 border-b" >created_at</th>
        <th class="px-6 py-2 border-b" >update_at</th>
      </tr>
    </thead>
    <tbody>
        {users.map((user)=>(

      <tr>
        <td class="px-6 py-2 border-b break-words">{user.name}</td>
        <td class="px-6 py-2 border-b break-words" >{user.email}</td>
        <td class="px-6 py-2 border-b break-words" >{user.created_at}</td>
        <td class="px-6 py-2 border-b break-words" >{user.updated_at}</td>
      </tr>
        ))}
    
    </tbody>
  </table>
  )
}


Users.layout = page => <Layout mainmenu={page} title="Welcome" />
export default Users
