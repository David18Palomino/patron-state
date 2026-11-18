import { OrderState } from './OrderState';
import { Order } from './Order';
import { PreparingState } from './PreparingState';

/**
 * ESTADO CONCRETO: PendingState (Pendiente)
 *
 * El pedido acaba de registrarse en el sistema y está a la espera de que cocina comience a elaborarlo.
 * - Permite la transición a PreparingState mediante prepare().
 * - Rechaza markAsReady() y deliver() (aún no se ha preparado).
 */
export class PendingState implements OrderState {
  public getName(): string {
    return 'Pendiente';
  }

  public prepare(order: Order): void {
    console.log(
      `👨‍🍳 [TRANSICIÓN] Pedido #${order.getId()}: Orden enviada a cocina. Iniciando PREPARACIÓN...`
    );
    order.setState(new PreparingState());
  }

  public markAsReady(order: Order): void {
    console.log(
      `❌ [RECHAZADO] Pedido #${order.getId()}: No se puede marcar como listo un pedido que aún está PENDIENTE de preparación.`
    );
  }

  public deliver(order: Order): void {
    console.log(
      `❌ [RECHAZADO] Pedido #${order.getId()}: No se puede entregar un pedido que está PENDIENTE y ni siquiera ha sido preparado.`
    );
  }
}

