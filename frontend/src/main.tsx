import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { NotificationsProvider } from '@mantine/notifications'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <NotificationsProvider position='top-right'>
    <App />

  </NotificationsProvider>
)
