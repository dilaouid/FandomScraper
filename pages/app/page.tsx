import { Background } from '@/components/Homepage/Background/Background'
import { WikiaRow } from '@/components/Homepage/WikiaRow/WikiaRow'
import './globals.css'

export default function Home() {
  return (
    <div>
      <Background />
      <div className="flex items-center justify-center h-screen ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 justify-items-center">
          <WikiaRow /> 
        </div>
      </div>
    </div>
  )
};