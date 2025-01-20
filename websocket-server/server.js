const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

function getSpeed(type) {
  if (type === 'upload') {
    return `${(Math.random() * 100).toFixed(2)} Mbps`;
  } else if (type === 'download') {
    return `${(Math.random() * 100).toFixed(2)} Mbps`;
  }
  return 'Unknown speed type';
}

wss.on('connection', (ws) => {
  console.log('Cliente conectado');
  
  ws.on('message', (message) => {
    console.log('Mensagem recebida: ', message);
    
    try {
      const request = JSON.parse(message);
      if (request.type && (request.type === 'upload' || request.type === 'download')) {
        // Responde com a velocidade do tipo solicitado
        const speed = getSpeed(request.type);
        ws.send(JSON.stringify({ type: request.type, speed: speed }));
      } else {
        // Caso a solicitação seja inválida
        ws.send(JSON.stringify({ error: 'Invalid request type. Use "upload" or "download".' }));
      }
    } catch (error) {
      console.error('Erro ao processar a mensagem:', error);
      ws.send(JSON.stringify({ error: 'Error processing request.' }));
    }
  });

  ws.on('close', () => {
    console.log('Cliente desconectado');
  });

  ws.on('error', (err) => {
    console.error('Erro no WebSocket:', err);
  });
});

console.log('Servidor WebSocket rodando na porta 8080...');
