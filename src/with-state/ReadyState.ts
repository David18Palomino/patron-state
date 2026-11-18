import { OrderState } from './OrderState';
import { Order } from './Order';
import { DeliveredState } from './DeliveredState';

/**
 * ESTADO CONCRETO: ReadyState (Listo)
 *
 * El pedido ha sido preparado por la cocina y está a la espera de ser entregado al cliente.
 * - Permite la transición a DeliveredState mediante deliver().
 * - Rechaza prepare() y markAsReady().
 */
export class ReadyState implements OrderState {
  public getName(): string {
    return 'Listo';
  }

  public prepare(order: Order): void {
    console.log(
      `❌ [RECHAZADO] Pedido #${order.getId()}: La comida ya está cocinada y LISTA para entrega. No requiere preparación.`
    );
  }

  public markAsReady(order: Order): void {
    console.log(
      `⚠️  [ADVERTENCIA] Pedido #${order.getId()}: El pedido ya se encuentra en estado LISTO.`
    );
  }

  public deliver(order: Order): void {
    console.log(
      `🚀 [TRANSICIÓN] Pedido #${order.getId()}: Entregando pedido al cliente...`
    );
    order.setState(new DeliveredState());
  }
}

