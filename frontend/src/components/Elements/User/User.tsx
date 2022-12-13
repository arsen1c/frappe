import React from 'react'
import { UserInfoICard } from './UserInfoCard'

const infoData = {
    "avatar": "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    "title": "Software engineer",
    "name": "Robert Glassbreaker",
    "email": "robert@glassbreaker.io",
    "phone": "+11 (876) 890 56 23"
}

function User() {
    return (
        <div><UserInfoICard {...infoData} /></div>
    )
}

export default User