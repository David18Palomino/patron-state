import { OrderState } from './OrderState';
import { Order } from './Order';

/**
 * ESTADO CONCRETO: DeliveredState (Entregado)
 *
 * Representa el estado final del proceso de un pedido.
 * No permite nuevas transiciones normales ya que el ciclo de vida concluyó.
 */
export class DeliveredState implements OrderState {
  public getName(): string {
    return 'Entregado';
  }

  public prepare(order: Order): void {
    console.log(
      `❌ [RECHAZADO] Pedido #${order.getId()}: El pedido ya fue ENTREGADO al cliente. No se puede volver a preparar.`
    );
  }

  public markAsReady(order: Order): void {
    console.log(
      `❌ [RECHAZADO] Pedido #${order.getId()}: El pedido ya fue ENTREGADO al cliente. No se puede marcar como listo.`
    );
  }

  public deliver(order: Order): void {
    console.log(
      `⚠️  [ADVERTENCIA] Pedido #${order.getId()}: El pedido ya ha sido entregado previamente. Operación redundante.`
    );
  }
}

