import { CustomerForm } from './CustomerForm'
import ShortestRouteView from './ShortestRouteView'

export default function ActionsContainer() {
  return (
    <div className="flex w-full justify-center gap-4 p-2">
      <CustomerForm />

      <ShortestRouteView />
    </div>
  )
}
