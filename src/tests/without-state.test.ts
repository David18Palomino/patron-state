import { Order } from '../without-state/Order';
import { OrderStatus } from '../without-state/OrderStatus';

export function testWithoutState(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`  ✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${testName}`);
      failed++;
    }
  }

  console.log('\n--- Ejecutando pruebas: Implementación SIN State ---');

  // Test 1: Estado inicial
  const order = new Order('TEST-01');
  assert(order.getStatus() === OrderStatus.PENDING, 'Estado inicial debe ser PENDIENTE');

  // Test 2: Rechazo de transiciones inválidas desde PENDIENTE
  const deliverFromPending = order.deliver();
  assert(!deliverFromPending, 'No debe permitir deliver() desde PENDIENTE');
  assert(order.getStatus() === OrderStatus.PENDING, 'El estado debe permanecer en PENDIENTE tras deliver() inválido');

  const readyFromPending = order.markAsReady();
  assert(!readyFromPending, 'No debe permitir markAsReady() desde PENDIENTE');
  assert(order.getStatus() === OrderStatus.PENDING, 'El estado debe permanecer en PENDIENTE tras markAsReady() inválido');

  // Test 3: Transición válida PENDIENTE -> PREPARANDO
  const prepareResult = order.prepare();
  assert(prepareResult, 'prepare() debe ser exitoso desde PENDIENTE');
  assert(order.getStatus() === OrderStatus.PREPARING, 'El estado debe ser PREPARANDO');

  // Test 4: Rechazo de transiciones inválidas desde PREPARANDO
  const rePrepare = order.prepare();
  assert(!rePrepare, 'No debe permitir prepare() cuando ya está PREPARANDO');
  const deliverWhilePreparing = order.deliver();
  assert(!deliverWhilePreparing, 'No debe permitir deliver() mientras está PREPARANDO');
  assert(order.getStatus() === OrderStatus.PREPARING, 'El estado debe permanecer en PREPARANDO');

  // Test 5: Transición válida PREPARANDO -> LISTO
  const readyResult = order.markAsReady();
  assert(readyResult, 'markAsReady() debe ser exitoso desde PREPARANDO');
  assert(order.getStatus() === OrderStatus.READY, 'El estado debe ser LISTO');

  // Test 6: Rechazo de transiciones inválidas desde LISTO
  const prepareFromReady = order.prepare();
  assert(!prepareFromReady, 'No debe permitir prepare() desde LISTO');
  assert(order.getStatus() === OrderStatus.READY, 'El estado debe permanecer en LISTO');

  // Test 7: Transición válida LISTO -> ENTREGADO
  const deliverResult = order.deliver();
  assert(deliverResult, 'deliver() debe ser exitoso desde LISTO');
  assert(order.getStatus() === OrderStatus.DELIVERED, 'El estado debe ser ENTREGADO');

  // Test 8: Ciclo finalizado (Rechazos desde ENTREGADO)
  const prepareFromDelivered = order.prepare();
  assert(!prepareFromDelivered, 'No debe permitir prepare() desde ENTREGADO');
  const readyFromDelivered = order.markAsReady();
  assert(!readyFromDelivered, 'No debe permitir markAsReady() desde ENTREGADO');
  const deliverFromDelivered = order.deliver();
  assert(!deliverFromDelivered, 'No debe permitir deliver() desde ENTREGADO');
  assert(order.getStatus() === OrderStatus.DELIVERED, 'El estado debe mantenerse inalterable en ENTREGADO');

  return { passed, failed };
}

