const http = require('http');
const url = require('url');
const calculadora = require('./calculadora');
const procesadorTexto = require('./procesadorTexto');

const servidor = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname, query } = parsedUrl;
  const mensajes = [];

  function agregarMensaje(mensaje) {
    mensajes.push(mensaje);
  }

  function enviarMensajes() {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(mensajes.join('<br>'));
  }

  if (pathname === '/calculadora') {
    const { operacion, num1, num2 } = query;

    if (operacion && num1 && num2) {
      agregarMensaje(`Numero1: ${num1}`);
      agregarMensaje(`Numero2: ${num2}`);

      let resultado;
      switch (operacion) {
        case 'sumar':
          resultado = calculadora.sumar(parseFloat(num1), parseFloat(num2));
          break;
        case 'restar':
          resultado = calculadora.restar(parseFloat(num1), parseFloat(num2));
          break;
        case 'multiplicar':
          resultado = calculadora.multiplicar(parseFloat(num1), parseFloat(num2));
          break;
        case 'dividir':
          resultado = calculadora.dividir(parseFloat(num1), parseFloat(num2));
          break;
        default:
          resultado = 'Operacion no valida';
      }
      agregarMensaje(`Resultado de ${operacion}: ${resultado}`);
      enviarMensajes();
    } else {
      res.end('Por favor, proporcione operacion, num1 y num2 en la URL');
    }
  } else if (pathname === '/procesadorTexto') {
    const { texto, accion } = query;

    if (texto && accion) {
      agregarMensaje(`Texto: ${texto}`);

      let resultado;
      switch (accion) {
        case 'dividirPalabra':
          resultado = procesadorTexto.dividirPalabra(texto).join(', ');
          break;
        case 'extraerCadena':
          resultado = procesadorTexto.extraerCadena(texto, 0, 5);
          break;
        case 'eliminarEspacios':
          resultado = procesadorTexto.eliminarEspacios(texto);
          break;
        case 'capitalizar':
          resultado = procesadorTexto.capitalizar(texto);
          break;
        case 'convertirMayusculas':
          resultado = procesadorTexto.convertirMayusculas(texto);
          break;
        case 'convertirMinusculas':
          resultado = procesadorTexto.convertirMinusculas(texto);
          break;
        case 'contarCaracteres':
          resultado = procesadorTexto.contarCaracteres(texto);
          break;
        default:
          resultado = 'Acción no válida';
      }
      agregarMensaje(`Resultado de ${accion}: ${resultado}`);
      enviarMensajes();
    } else {
      res.end('Por favor, proporcione texto y acción en la URL');
    }
  } else {
    res.end('Ruta no válida');
  }
}).listen(8080);

console.log('Servidor web escuchando en el puerto 8080');
