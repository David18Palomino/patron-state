import { OrderState } from './OrderState';
import { Order } from './Order';
import { ReadyState } from './ReadyState';

/**
 * ESTADO CONCRETO: PreparingState (Preparando)
 *
 * La cocina se encuentra elaborando los platillos del pedido.
 * - Permite la transición a ReadyState mediante markAsReady().
 * - Rechaza prepare() (ya está cocinándose) y deliver() (no se puede entregar comida cruda/sin terminar).
 */
export class PreparingState implements OrderState {
  public getName(): string {
    return 'Preparando';
  }

  public prepare(order: Order): void {
    console.log(
      `⚠️  [ADVERTENCIA] Pedido #${order.getId()}: La cocina ya se encuentra preparando este pedido.`
    );
  }

  public markAsReady(order: Order): void {
    console.log(
      `🍲 [TRANSICIÓN] Pedido #${order.getId()}: Cocina finalizó la elaboración. Marcando pedido como LISTO.`
    );
    order.setState(new ReadyState());
  }

  public deliver(order: Order): void {
    console.log(
      `❌ [RECHAZADO] Pedido #${order.getId()}: No se puede entregar un pedido que todavía se está PREPARANDO en cocina.`
    );
  }
}

