interface CustomerCardProps {
  customer: {
    name: string
    email: string
    phone: string
    longitude: number
    latitude: number
  }
  showCoordinates?: boolean
}

export default function CustomerCard({
  customer,
  showCoordinates = false,
}: CustomerCardProps) {
  const { name, email, phone, longitude, latitude } = customer

  return (
    <div className="flex flex-col rounded bg-sky-300 p-2 text-sm sm:text-base">
      <span>{name}</span>
      {!showCoordinates && (
        <>
          <span>{email}</span>
          <span>{phone}</span>
        </>
      )}
      {showCoordinates && (
        <span>{`coordenadas: (${longitude}, ${latitude})`}</span>
      )}
    </div>
  )
}
