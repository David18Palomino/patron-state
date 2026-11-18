import { testWithoutState } from './without-state.test';
import { testWithState } from './with-state.test';

function runSuite(): void {
  console.log('================================================================');
  console.log(' SUITE DE PRUEBAS AUTOMATIZADAS - PATRÓN STATE EN RESTAURANTE');
  console.log('================================================================');

  const withoutResult = testWithoutState();
  const withResult = testWithState();

  const totalPassed = withoutResult.passed + withResult.passed;
  const totalFailed = withoutResult.failed + withResult.failed;
  const totalTests = totalPassed + totalFailed;

  console.log('\n================================================================');
  console.log(' RESUMEN FINAL DE PRUEBAS');
  console.log('================================================================');
  console.log(`Pruebas totales ejecutadas: ${totalTests}`);
  console.log(`Pruebas exitosas (PASS)   : ${totalPassed}`);
  console.log(`Pruebas fallidas (FAIL)   : ${totalFailed}`);

  if (totalFailed > 0) {
    console.error('\n❌ ERROR: Algunas pruebas no pasaron las aserciones.');
    process.exit(1);
  } else {
    console.log('\n🎉 ¡TODAS LAS PRUEBAS PASARON EXITOSAMENTE!');
    console.log('El comportamiento de las dos implementaciones es consistente.');
  }
}

runSuite();

