import { runWithoutStateDemo } from './without-state';
import { runWithStateDemo } from './with-state';

function main(): void {
  console.log('#################################################################');
  console.log('# CASO PRÁCTICO ACADÉMICO: PATRÓN DE DISEÑO STATE (ESTADO)      #');
  console.log('# SISTEMA DE GESTIÓN DE PEDIDOS DE COMIDA - RESTAURANTE         #');
  console.log('#################################################################\n');

  console.log('PARTE 1: IMPLEMENTACIÓN SIN STATE (Enfoque tradicional con if/else)');
  runWithoutStateDemo();

  console.log('\n\n');
  console.log('PARTE 2: IMPLEMENTACIÓN CON STATE (Enfoque orientado a objetos)');
  runWithStateDemo();

  console.log('\n#################################################################');
  console.log('# RESUMEN DE LA COMPARACIÓN                                      #');
  console.log('# 1. Sin State: Order asume todas las responsabilidades y valida #');
  console.log('#    mediante condicionales acumulados. Modificar o agregar un   #');
  console.log('#    estado requiere alterar la clase Order (rompe SRP y OCP).   #');
  console.log('# 2. Con State: Cada estado es una clase independiente con sus   #');
  console.log('#    propias reglas. Order delega el comportamiento al estado    #');
  console.log('#    actual. Extender el sistema no modifica clases existentes.  #');
  console.log('#################################################################');
}

main();

