import { Order } from './Order';

/**
 * Demostración interactiva de la versión con el patrón State
 */
export function runWithStateDemo(): void {
  console.log('================================================================');
  console.log(' DEMOSTRACIÓN: IMPLEMENTACIÓN CON PATRÓN STATE (CONTEXT & STATES)');
  console.log('================================================================');

  // 1. Crear un pedido
  const order = new Order('ORD-101');

  // 2. Consultar su estado inicial
  console.log(`📌 Estado inicial del Pedido #${order.getId()}: ${order.getStateName()}`);

  console.log('\n--- CASO 1: Intentos de operaciones inválidas desde estado PENDIENTE ---');
  // Intentar entregar un pedido pendiente
  order.deliver();
  console.log(`Verificación de estado (debe seguir Pendiente): ${order.getStateName()}`);

  // Intentar marcar como listo un pedido pendiente
  order.markAsReady();
  console.log(`Verificación de estado (debe seguir Pendiente): ${order.getStateName()}`);

  console.log('\n--- CASO 2: Flujo de vida completo (transiciones válidas) ---');
  // 3. Ejecutar prepare()
  order.prepare();
  // 4. Consultar el nuevo estado
  console.log(`📌 Estado actual: ${order.getStateName()}`);

  // Intento inválido mientras está preparando (entregar antes de tiempo)
  console.log('\n--- CASO 3: Intento inválido mientras está PREPARANDO ---');
  order.deliver();
  console.log(`Verificación de estado (debe seguir Preparando): ${order.getStateName()}`);

  // 5. Ejecutar markAsReady()
  order.markAsReady();
  // 6. Consultar el nuevo estado
  console.log(`📌 Estado actual: ${order.getStateName()}`);

  // Intento inválido mientras está listo (preparar de nuevo)
  console.log('\n--- CASO 4: Intento inválido mientras está LISTO ---');
  order.prepare();
  console.log(`Verificación de estado (debe seguir Listo): ${order.getStateName()}`);

  // 7. Ejecutar deliver()
  order.deliver();
  // 8. Consultar el estado final
  console.log(`📌 Estado final: ${order.getStateName()}`);

  console.log('\n--- CASO 5: Intentos de operaciones después de ENTREGADO ---');
  // Intentar preparar nuevamente un pedido entregado
  order.prepare();
  // Intentar marcar como listo un pedido entregado
  order.markAsReady();
  // Intentar entregar un pedido ya entregado
  order.deliver();
  console.log(`📌 Estado final inalterado: ${order.getStateName()}`);
}

if (require.main === module) {
  runWithStateDemo();
}

