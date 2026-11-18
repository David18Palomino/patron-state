import { Order } from './Order';

/**
 * Demostración interactiva de la versión SIN State
 */
export function runWithoutStateDemo(): void {
  console.log('================================================================');
  console.log(' DEMOSTRACIÓN: IMPLEMENTACIÓN SIN PATRÓN STATE (MONOLÍTICA)');
  console.log('================================================================');

  const order = new Order('ORD-001');
  console.log(`Estado Inicial del Pedido #${order.getId()}: ${order.getStatus()}`);

  console.log('\n--- 1. Intentando operaciones inválidas desde PENDIENTE ---');
  order.deliver();     // Inválido: PENDIENTE -> ENTREGADO
  order.markAsReady(); // Inválido: PENDIENTE -> LISTO

  console.log('\n--- 2. Flujo normal (transiciones válidas) ---');
  order.prepare();     // Válido: PENDIENTE -> PREPARANDO
  console.log(`Estado actual: ${order.getStatus()}`);

  order.markAsReady(); // Válido: PREPARANDO -> LISTO
  console.log(`Estado actual: ${order.getStatus()}`);

  order.deliver();     // Válido: LISTO -> ENTREGADO
  console.log(`Estado final: ${order.getStatus()}`);

  console.log('\n--- 3. Intentando operaciones inválidas desde ENTREGADO ---');
  order.prepare();     // Inválido: ya entregado
  order.markAsReady(); // Inválido: ya entregado
  order.deliver();     // Inválido / redundante: ya entregado
  console.log(`Estado final inalterado: ${order.getStatus()}`);
}

if (require.main === module) {
  runWithoutStateDemo();
}

