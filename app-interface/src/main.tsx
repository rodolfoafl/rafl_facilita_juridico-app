import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import { CustomersProvider } from './contexts/Customers/CustomersContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CustomersProvider>
      <App />
    </CustomersProvider>
  </React.StrictMode>,
)
