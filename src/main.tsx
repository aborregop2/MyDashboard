import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { PrimeReactProvider } from 'primereact/api'
import Tailwind from 'primereact/passthrough/tailwind'
import { twMerge } from 'tailwind-merge'




createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider value={{unstyled: false, pt: {}, ptOptions: {mergeSections: true, mergeProps: true, classNameMergeFunction: twMerge}}}>
      <App />
    </PrimeReactProvider>
  </StrictMode>
)
