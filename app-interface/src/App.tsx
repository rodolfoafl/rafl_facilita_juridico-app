import './global.css'

import ActionsContainer from './components/ActionsContainer'
import ListContainer from './components/ListContainer'

export default function App() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-sky-950 p-6">
      <div className="flex h-full max-h-[768px] w-full max-w-[640px] flex-col items-center justify-between rounded bg-sky-100 p-4">
        <ListContainer />

        <ActionsContainer />
      </div>
    </div>
  )
}
