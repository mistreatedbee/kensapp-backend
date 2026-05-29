const clients = new Set();

function eventsHandler(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no',
  });
  res.write(`event: connected\ndata: ${JSON.stringify({ ok: true })}\n\n`);

  clients.add(res);
  req.on('close', () => {
    clients.delete(res);
  });
}

function broadcast(type, payload = {}) {
  const message = `event: ${type}\ndata: ${JSON.stringify({ type, ...payload, ts: Date.now() })}\n\n`;
  for (const client of clients) {
    client.write(message);
  }
}

module.exports = { eventsHandler, broadcast };
