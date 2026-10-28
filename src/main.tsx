import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/noto-sans-thai-looped/latin-400.css'
import '@fontsource/noto-sans-thai-looped/latin-600.css'
import '@fontsource/noto-sans-thai-looped/thai-400.css'
import '@fontsource/noto-sans-thai-looped/thai-600.css'
import '@fontsource/cormorant-garamond/latin-500.css'
import '@fontsource/cormorant-garamond/latin-600.css'
import '@fontsource/cormorant-garamond/latin-500-italic.css'
import '@fontsource/caveat/latin-500.css'
import '@fontsource/caveat/latin-700.css'
import './styles/tokens.css'
import './styles/art.css'
import './styles/base.css'
import './styles/chapters.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
