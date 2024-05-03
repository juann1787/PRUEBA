// Feature: Pruebas de solicitud de recogida

//   Scenario: Crear solicitud de recogida exitosa
//     Given que tengo una solicitud de recogida válida
//     When envío la solicitud de recogida
//     Then la solicitud se crea exitosamente

//   Scenario: Validación de fecha de recogida futura
//     Given que tengo una solicitud de recogida con fecha de recogida más de 5 días en el futuro
//     When intento enviar la solicitud de recogida
//     Then recibo un mensaje de error indicando que la fecha de recogida debe ser dentro de los 5 días hábiles siguientes

//   Scenario: Validación de solicitud duplicada
//     Given que tengo una solicitud de recogida con una dirección y fecha ya utilizadas previamente
//     When intento enviar la misma solicitud de recogida nuevamente
//     Then recibo un mensaje de error indicando que ya existe una solicitud de recogida con esta dirección y fecha

import { test, expect } from '@playwright/test';

test('Crear solicitud de recogida exitosa', async ({request}) => {
  const solicitudRecogida = {
    direccion: 'Calle Ejemplo 123',
    fechaRecogida: '2024-05-05',
    nombreEntrega: 'Juan',
    apellidosEntrega: 'Perez',
    celularEntrega: '123456789',
    emailUsuario: 'juan@example.com',
    descripcionTipoVia: 'Calle',
    aplicativo: 'App de ejemplo'
  };

  const response = await request.post('https://apiv2-test.coordinadora.com/recogidas/cm-solicitud-recogidas-ms/solicitud-recogida', solicitudRecogida);

  expect(response.status).toBe(200);
  expect(response.data).toHaveProperty('message', 'Solicitud de recogida creada exitosamente');
});

test('Validación de fecha de recogida futura', async ({request}) => {
  const solicitudRecogida = {
    direccion: 'Calle Ejemplo 123',
    fechaRecogida: '2024-05-10', // Fecha más de 5 días en el futuro
    nombreEntrega: 'Juan',
    apellidosEntrega: 'Perez',
    celularEntrega: '123456789',
    emailUsuario: 'juan@example.com',
    descripcionTipoVia: 'Calle',
    aplicativo: 'App de ejemplo'
  };

  try {
    await request.post('https://apiv2-test.coordinadora.com/recogidas/cm-solicitud-recogidas-ms/solicitud-recogida', solicitudRecogida);
  } catch (error) {
    expect(error.response.status).toBe(400);
    expect(error.response.data).toHaveProperty('message', 'La fecha de recogida debe ser dentro de los 5 días hábiles siguientes');
  }
});

test('Validación de solicitud duplicada', async ( {request}) => {
  const solicitudRecogida = {
    direccion: 'Calle Ejemplo 123',
    fechaRecogida: '2024-05-06', // Fecha utilizada previamente
    nombreEntrega: 'Juan',
    apellidosEntrega: 'Perez',
    celularEntrega: '123456789',
    emailUsuario: 'juan@example.com',
    descripcionTipoVia: 'Calle',
    aplicativo: 'App de ejemplo'
  };

  try {
    await request.post('https://apiv2-test.coordinadora.com/recogidas/cm-solicitud-recogidas-ms/solicitud-recogida', solicitudRecogida);
  } catch (error) {
    expect(error.response.status).toBe(400);
    expect(error.response.data).toHaveProperty('message', 'Ya existe una solicitud de recogida con esta dirección y fecha');
  }
});