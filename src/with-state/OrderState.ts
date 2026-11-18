import { Order } from './Order';

/**
 * INTERFAZ: OrderState (State)
 *
 * Define el contrato común que todos los estados concretos deben implementar.
 * Cada método representa una acción u operación que puede solicitarse sobre el pedido.
 * Recibe la referencia al contexto (Order) para poder interactuar con él y gestionar las transiciones.
 */
export interface OrderState {
  /**
   * Intenta pasar el pedido a preparación.
   * @param order Referencia al contexto Order.
   */
  prepare(order: Order): void;

  /**
   * Intenta marcar el pedido como listo para entrega.
   * @param order Referencia al contexto Order.
   */
  markAsReady(order: Order): void;

  /**
   * Intenta realizar la entrega final del pedido al cliente.
   * @param order Referencia al contexto Order.
   */
  deliver(order: Order): void;

  /**
   * Retorna el nombre descriptivo del estado actual.
   */
  getName(): string;
}

