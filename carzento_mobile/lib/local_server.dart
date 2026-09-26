import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';

class LocalAssetServer {
  HttpServer? _server;
  int get port => _server?.port ?? 0;

  Future<int> start() async {
    // Bind to any free port on loopback IPv4 (127.0.0.1)
    _server = await HttpServer.bind(InternetAddress.loopbackIPv4, 0);
    _server!.listen(_handleRequest);
    debugPrint('LocalAssetServer running on http://127.0.0.1:${_server!.port}');
    return _server!.port;
  }

  void _handleRequest(HttpRequest request) async {
    final response = request.response;
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', '*');
    response.headers.set('Cache-Control', 'no-cache');

    if (request.method == 'OPTIONS') {
      response.statusCode = HttpStatus.ok;
      await response.close();
      return;
    }

    String path = request.uri.path;
    if (path == '/' || path.isEmpty) {
      path = '/index.html';
    }

    if (path.startsWith('/')) {
      path = path.substring(1);
    }

    // Try finding the asset in assets/www/
    final assetPath = 'assets/www/$path';

    try {
      final byteData = await rootBundle.load(assetPath);
      final bytes = byteData.buffer.asUint8List();

      final mimeType = _getMimeType(path);
      response.headers.set('Content-Type', mimeType);
      response.add(bytes);
      await response.close();
    } catch (e) {
      // Fallback for SPA routing: serve index.html if file has no extension
      if (!path.contains('.')) {
        try {
          final fallbackData = await rootBundle.load('assets/www/index.html');
          response.headers.set('Content-Type', 'text/html; charset=utf-8');
          response.add(fallbackData.buffer.asUint8List());
          await response.close();
          return;
        } catch (_) {}
      }

      response.statusCode = HttpStatus.notFound;
      response.write('Not found: $path');
      await response.close();
    }
  }

  String _getMimeType(String path) {
    if (path.endsWith('.html')) return 'text/html; charset=utf-8';
    if (path.endsWith('.js') || path.endsWith('.mjs')) return 'application/javascript; charset=utf-8';
    if (path.endsWith('.css')) return 'text/css; charset=utf-8';
    if (path.endsWith('.json')) return 'application/json';
    if (path.endsWith('.svg')) return 'image/svg+xml';
    if (path.endsWith('.png')) return 'image/png';
    if (path.endsWith('.jpg') || path.endsWith('.jpeg')) return 'image/jpeg';
    if (path.endsWith('.webp')) return 'image/webp';
    if (path.endsWith('.ico')) return 'image/x-icon';
    if (path.endsWith('.woff2')) return 'font/woff2';
    if (path.endsWith('.woff')) return 'font/woff';
    if (path.endsWith('.ttf')) return 'font/ttf';
    return 'application/octet-stream';
  }

  Future<void> stop() async {
    await _server?.close(force: true);
    _server = null;
  }
}
