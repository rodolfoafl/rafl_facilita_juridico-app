import { getDistanceBetweenTwoPoints } from './get-distance-between-two-points'

interface Customer {
  latitude: number
  longitude: number
}

export function getNearestCustomersFromOrigin(pointsToOrder: Customer[]) {
  // Ponto de origem inicial: (0,0)
  const origin = { x: 0, y: 0 }
  const currentOrigin = origin

  const orderedPoints = []

  let nearestDistance = 99999
  let nearestCustomerIndex = 0

  // Percorre o array original, enquanto não estiver vazio
  for (let j = pointsToOrder.length; j > 0; j--) {
    // Percorre o array para achar o ponto mais próximo, relativo ao ponto de origem atual
    for (let index = 0; index < pointsToOrder.length; index++) {
      // Calcula a distância entre os pontos
      const currentDistance = getDistanceBetweenTwoPoints(
        { x: currentOrigin.x, y: currentOrigin.y },
        {
          x: pointsToOrder[index]?.longitude,
          y: pointsToOrder[index]?.latitude,
        },
      )

      if (currentDistance < nearestDistance) {
        nearestDistance = currentDistance
        nearestCustomerIndex = index
      }
    }

    // Adiciona o ponto mais próximo ao array ordenado
    orderedPoints.push(pointsToOrder[nearestCustomerIndex])

    // Atualiza o ponto de origem
    currentOrigin.x = orderedPoints[orderedPoints.length - 1]?.longitude
    currentOrigin.y = orderedPoints[orderedPoints.length - 1]?.latitude

    // Remove o ponto mais próximo do array original
    pointsToOrder.splice(nearestCustomerIndex, 1)

    // Reseta valores
    nearestDistance = 99999
    nearestCustomerIndex = 0
  }

  return orderedPoints
}
