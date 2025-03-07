import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'semantic-ui-css/semantic.min.css'
import { NotificationContextProvider } from './context/notificationContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserContextProvider } from './context/userContext'
import { BrowserRouter as Router } from 'react-router-dom'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <UserContextProvider>
            <NotificationContextProvider>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </NotificationContextProvider>
        </UserContextProvider>
    </Router>
    )