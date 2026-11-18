import { OrderState } from './OrderState';
import { PendingState } from './PendingState';

/**
 * CONTEXTO: Order (Context)
 *
 * Mantiene la referencia a una instancia de una subclase o implementación de OrderState,
 * la cual representa el estado interno actual del pedido.
 *
 * Delega toda la lógica de negocio y las transiciones al objeto estado actual, logrando que
 * la clase Order permanezca limpia, sin condicionales y abierta a extensiones (OCP).
 */
export class Order {
  private id: string;
  private state: OrderState;

  constructor(id: string, initialState?: OrderState) {
    this.id = id;
    // Por defecto, cada nuevo pedido inicia en estado Pendiente
    this.state = initialState ?? new PendingState();
  }

  public getId(): string {
    return this.id;
  }

  /**
   * Obtiene la instancia del estado actual.
   */
  public getState(): OrderState {
    return this.state;
  }

  /**
   * Obtiene el nombre del estado actual a través del objeto estado.
   */
  public getStateName(): string {
    return this.state.getName();
  }

  /**
   * Permite actualizar la referencia al estado actual.
   * Es invocado principalmente por los objetos State durante las transiciones.
   */
  public setState(state: OrderState): void {
    const previousStateName = this.state ? this.state.getName() : 'Ninguno';
    this.state = state;
    console.log(
      `   🔄 [Contexto Order] Pedido #${this.id}: Transición completada de '${previousStateName}' a '${this.state.getName()}'.`
    );
  }

  /**
   * Delega la operación de preparación al estado actual.
   */
  public prepare(): void {
    console.log(`\n➡️  [Cliente -> Order #${this.id}] Invocando prepare()...`);
    this.state.prepare(this);
  }

  /**
   * Delega la operación de marcar como listo al estado actual.
   */
  public markAsReady(): void {
    console.log(`\n➡️  [Cliente -> Order #${this.id}] Invocando markAsReady()...`);
    this.state.markAsReady(this);
  }

  /**
   * Delega la operación de entrega al estado actual.
   */
  public deliver(): void {
    console.log(`\n➡️  [Cliente -> Order #${this.id}] Invocando deliver()...`);
    this.state.deliver(this);
  }
}

