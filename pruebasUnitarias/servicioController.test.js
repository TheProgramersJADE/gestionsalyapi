// Importamos el controlador y el modelo 
const servicioController = require('../src/controllers/servicios.controller');
const model = require('../src/models/servicio');

// Mockeamos el modelo
jest.mock('../src/models/servicio');

// Simulamos Express (req, res)
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = (body = {}, params = {}) => ({ body, params });

//pruebas
describe('servicioController.store', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  //Prueba exitosa
  test('debe crear un servicio correctamente (201)', async () => {
    const req = mockRequest({
      nombre_servicio: 'Corte de cabello mujer',
      descripcion: 'Corte clásico',
      duracion: 30,
      precio: 10
    });
    const res = mockResponse();

    // Mockeamos la respuesta del modelo
    model.store.mockResolvedValue({ id: 1 });

    await servicioController.store(req, res);

    // 🧾 Mostrar datos enviados y recibidos
    console.log('\n [PRUEBA EXISTOSA AL CREAR 201: Servicio creado Exitosamente]');
    console.log('Datos enviados:', req.body);
    console.log('Respuesta del controlador:', res.json.mock.calls[0][0]);

    expect(model.store).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Servicio creado', id: 1 });
  });

    //Prueba fallida
  test('debe devolver 400 si faltan campos requeridos', async () => {
    const req = mockRequest({
      nombre_servicio: '',
      descripcion: 'desc',
      duracion: null,
      precio: 8
    });
    const res = mockResponse();

    await servicioController.store(req, res);

    console.log('\n [PRUEBA DE FALLO 400: Campos Faltantes]');
    console.log('Datos enviados:', req.body);
    console.log('Respuesta del controlador:', res.json.mock.calls[0][0]);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      error: 'Faltan campos obligatorios',
      camposFaltantes: expect.any(Object)
    }));
  });

    //Prueba de error desde el sistema
  test('debe devolver 500 si ocurre un error en el modelo', async () => {
    const req = mockRequest({
      nombre_servicio: 'Lavado',
      descripcion: 'Completo',
      duracion: 60,
      precio: 15
    });
    const res = mockResponse();

    model.store.mockRejectedValue(new Error('Fallo de conexión'));

    await servicioController.store(req, res);

    
    console.log('\n [PRUEBA DE ERROR 500: Error en el modelo]');
    console.log('Datos enviados:', req.body);
    console.log('Respuesta del controlador:', res.json.mock.calls[0][0]);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Fallo de conexión' });
  });
});
