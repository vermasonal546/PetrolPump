import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './Components/App'
import UserProvider, { UserContext } from './Components/UserContext'
 
createRoot(document.getElementById('root')).render(

<UserProvider>
    <App/>
</UserProvider>
)
