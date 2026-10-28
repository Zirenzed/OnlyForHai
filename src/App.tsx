import { StoryProvider } from './state/StoryContext'
import { StoryShell } from './components/StoryShell'

export default function App() {
  return (
    <StoryProvider>
      <StoryShell />
    </StoryProvider>
  )
}
