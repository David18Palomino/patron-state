import { Order } from '../with-state/Order';
import { PendingState } from '../with-state/PendingState';
import { PreparingState } from '../with-state/PreparingState';
import { ReadyState } from '../with-state/ReadyState';
import { DeliveredState } from '../with-state/DeliveredState';

export function testWithState(): { passed: number; failed: number } {
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

  console.log('\n--- Ejecutando pruebas: Implementación CON State ---');

  // Test 1: Estado inicial debe ser PendingState
  const order = new Order('TEST-101');
  assert(order.getState() instanceof PendingState, 'El estado inicial debe ser una instancia de PendingState');
  assert(order.getStateName() === 'Pendiente', 'El nombre del estado inicial debe ser "Pendiente"');

  // Test 2: Rechazo de transiciones inválidas desde PendingState
  order.deliver(); // No permitido
  assert(order.getState() instanceof PendingState, 'deliver() en Pendiente no debe alterar el estado');
  assert(order.getStateName() === 'Pendiente', 'Nombre de estado debe seguir siendo "Pendiente"');

  order.markAsReady(); // No permitido
  assert(order.getState() instanceof PendingState, 'markAsReady() en Pendiente no debe alterar el estado');

  // Test 3: Transición válida Pendiente -> Preparando
  order.prepare();
  assert(order.getState() instanceof PreparingState, 'prepare() debe transicionar a PreparingState');
  assert(order.getStateName() === 'Preparando', 'Nombre de estado debe ser "Preparando"');

  // Test 4: Rechazo de transiciones inválidas desde PreparingState
  order.prepare(); // Advertencia, ya está preparando
  assert(order.getState() instanceof PreparingState, 'prepare() redundante en Preparando no debe cambiar el estado');

  order.deliver(); // No permitido antes de tiempo
  assert(order.getState() instanceof PreparingState, 'deliver() en Preparando no debe cambiar el estado');

  // Test 5: Transición válida Preparando -> Listo
  order.markAsReady();
  assert(order.getState() instanceof ReadyState, 'markAsReady() debe transicionar a ReadyState');
  assert(order.getStateName() === 'Listo', 'Nombre de estado debe ser "Listo"');

  // Test 6: Rechazo de transiciones inválidas desde ReadyState
  order.prepare(); // No permitido
  assert(order.getState() instanceof ReadyState, 'prepare() en Listo no debe cambiar el estado');

  order.markAsReady(); // Advertencia
  assert(order.getState() instanceof ReadyState, 'markAsReady() redundante en Listo no debe cambiar el estado');

  // Test 7: Transición válida Listo -> Entregado
  order.deliver();
  assert(order.getState() instanceof DeliveredState, 'deliver() debe transicionar a DeliveredState');
  assert(order.getStateName() === 'Entregado', 'Nombre de estado debe ser "Entregado"');

  // Test 8: Ciclo finalizado (Rechazos y advertencias desde DeliveredState)
  order.prepare();
  assert(order.getState() instanceof DeliveredState, 'prepare() en Entregado no debe cambiar el estado');

  order.markAsReady();
  assert(order.getState() instanceof DeliveredState, 'markAsReady() en Entregado no debe cambiar el estado');

  order.deliver();
  assert(order.getState() instanceof DeliveredState, 'deliver() en Entregado no debe cambiar el estado');

  // Test 9: Comprobación de encapsulamiento y polimorfismo
  const customOrder = new Order('TEST-CUSTOM', new ReadyState());
  assert(customOrder.getStateName() === 'Listo', 'Debe inicializar correctamente con estado inyectado');
  customOrder.deliver();
  assert(customOrder.getStateName() === 'Entregado', 'Debe responder polimórficamente al comportamiento de ReadyState');

  return { passed, failed };
}

