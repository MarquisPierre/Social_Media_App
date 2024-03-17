import { ReactNode } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()

const QueryProvider = ({children}: { children: ReactNode}) => {
  return (
    <div>
        <QueryClientProvider client = { queryClient}>
            {children}
        </QueryClientProvider>
    </div>
  )
}

export default QueryProvider
