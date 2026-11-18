/**
 * Enumeración que representa los estados posibles de un pedido.
 * Utilizado en la versión SIN patrón State.
 */
export enum OrderStatus {
  PENDING = 'PENDIENTE',
  PREPARING = 'PREPARANDO',
  READY = 'LISTO',
  DELIVERED = 'ENTREGADO',
}

