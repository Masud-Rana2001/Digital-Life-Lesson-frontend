import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router'
import './index.css'
import AuthProvider from './providers/AuthProvider.jsx'
import ThemeProvider from './providers/ThemeProvider.jsx'
import { router } from './routes/Routes.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
})

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster 
          position='top-right' 
          reverseOrder={false}
          toastOptions={{
            className: 'bg-base-100 text-base-content border border-base-300',
            duration: 3000,
          }}
        />
      </AuthProvider>
    </ThemeProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
