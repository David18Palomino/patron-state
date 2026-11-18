import { OrderStatus } from './OrderStatus';

/**
 * IMPLEMENTACIÓN 1: SIN APLICAR EL PATRÓN STATE
 *
 * En esta clase se evidencia el problema clásico:
 * - Concentración de todas las reglas de negocio y transiciones en una sola clase (violación de SRP).
 * - Acumulación masiva de condicionales (if / else if / switch) en cada operación.
 * - Alto acoplamiento y fragilidad: agregar o modificar un estado requiere alterar toda la clase Order (violación de OCP).
 */
export class Order {
  private id: string;
  private status: OrderStatus;

  constructor(id: string) {
    this.id = id;
    this.status = OrderStatus.PENDING; // Estado inicial por defecto
  }

  public getId(): string {
    return this.id;
  }

  public getStatus(): OrderStatus {
    return this.status;
  }

  /**
   * Operación de preparación utilizando condicionales para validar el estado actual.
   */
  public prepare(): boolean {
    console.log(`[Sin State] Solicitando prepare() en Pedido #${this.id} (Estado actual: ${this.status})`);

    if (this.status === OrderStatus.PENDING) {
      this.status = OrderStatus.PREPARING;
      console.log(`  -> ÉXITO: Pedido #${this.id} ahora está PREPARANDO.`);
      return true;
    } else if (this.status === OrderStatus.PREPARING) {
      console.log(`  -> ADVERTENCIA: Pedido #${this.id} ya se encuentra en preparación.`);
      return false;
    } else if (this.status === OrderStatus.READY) {
      console.log(`  -> RECHAZADO: Pedido #${this.id} ya está cocinado y LISTO; no se puede volver a preparar.`);
      return false;
    } else if (this.status === OrderStatus.DELIVERED) {
      console.log(`  -> RECHAZADO: Pedido #${this.id} ya fue ENTREGADO; su ciclo de vida concluyó.`);
      return false;
    }

    return false;
  }

  /**
   * Operación para marcar el pedido como listo utilizando condicionales.
   */
  public markAsReady(): boolean {
    console.log(`[Sin State] Solicitando markAsReady() en Pedido #${this.id} (Estado actual: ${this.status})`);

    if (this.status === OrderStatus.PREPARING) {
      this.status = OrderStatus.READY;
      console.log(`  -> ÉXITO: Pedido #${this.id} ahora está LISTO para entrega.`);
      return true;
    } else if (this.status === OrderStatus.PENDING) {
      console.log(`  -> RECHAZADO: Pedido #${this.id} está PENDIENTE. Debe prepararse antes de marcarse como listo.`);
      return false;
    } else if (this.status === OrderStatus.READY) {
      console.log(`  -> ADVERTENCIA: Pedido #${this.id} ya está marcado como LISTO.`);
      return false;
    } else if (this.status === OrderStatus.DELIVERED) {
      console.log(`  -> RECHAZADO: Pedido #${this.id} ya fue ENTREGADO.`);
      return false;
    }

    return false;
  }

  /**
   * Operación para entregar el pedido utilizando condicionales.
   */
  public deliver(): boolean {
    console.log(`[Sin State] Solicitando deliver() en Pedido #${this.id} (Estado actual: ${this.status})`);

    if (this.status === OrderStatus.READY) {
      this.status = OrderStatus.DELIVERED;
      console.log(`  -> ÉXITO: Pedido #${this.id} fue ENTREGADO al cliente exitosamente.`);
      return true;
    } else if (this.status === OrderStatus.PENDING) {
      console.log(`  -> RECHAZADO: Pedido #${this.id} no puede entregarse porque aún está PENDIENTE.`);
      return false;
    } else if (this.status === OrderStatus.PREPARING) {
      console.log(`  -> RECHAZADO: Pedido #${this.id} no puede entregarse porque aún se está PREPARANDO.`);
      return false;
    } else if (this.status === OrderStatus.DELIVERED) {
      console.log(`  -> ADVERTENCIA: Pedido #${this.id} ya fue entregado previamente.`);
      return false;
    }

    return false;
  }
}

