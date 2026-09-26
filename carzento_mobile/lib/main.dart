import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:webview_flutter_android/webview_flutter_android.dart';
import 'local_server.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.light,
      systemNavigationBarColor: Color(0xFF020408),
      systemNavigationBarIconBrightness: Brightness.light,
    ),
  );
  runApp(const CarzentoApp());
}

class CarzentoApp extends StatelessWidget {
  const CarzentoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Carzento',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF020408),
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFF1EA599),
          surface: Color(0xFF0D1821),
        ),
        useMaterial3: true,
      ),
      home: const CarzentoWebViewPage(),
    );
  }
}

class CarzentoWebViewPage extends StatefulWidget {
  const CarzentoWebViewPage({super.key});

  @override
  State<CarzentoWebViewPage> createState() => _CarzentoWebViewPageState();
}

class _CarzentoWebViewPageState extends State<CarzentoWebViewPage> {
  late final WebViewController _controller;
  final LocalAssetServer _localServer = LocalAssetServer();
  bool _isLoading = true;
  double _loadingProgress = 0.0;
  String? _errorMessage;

  @override
  void initState() {
    super.initState();
    _initWebViewAndServer();
  }

  Future<void> _initWebViewAndServer() async {
    try {
      // 1. Start the loopback in-app HTTP server (bypasses CORS restrictions on file://)
      final port = await _localServer.start();

      // 2. Configure WebViewController
      _controller = WebViewController()
        ..setJavaScriptMode(JavaScriptMode.unrestricted)
        ..setBackgroundColor(const Color(0xFF020408))
        ..setNavigationDelegate(
          NavigationDelegate(
            onProgress: (int progress) {
              if (mounted) {
                setState(() {
                  _loadingProgress = progress / 100.0;
                });
              }
            },
            onPageStarted: (String url) {
              if (mounted) {
                setState(() {
                  _isLoading = true;
                  _errorMessage = null;
                });
              }
            },
            onPageFinished: (String url) {
              if (mounted) {
                setState(() {
                  _isLoading = false;
                });
              }
            },
            onWebResourceError: (WebResourceError error) {
              debugPrint('WebView Error: [${error.errorCode}] ${error.description}');
            },
          ),
        );

      if (_controller.platform is AndroidWebViewController) {
        AndroidWebViewController.enableDebugging(true);
        final androidController = _controller.platform as AndroidWebViewController;
        androidController.setMediaPlaybackRequiresUserGesture(false);
      }

      // 3. Load the local HTML URL over loopback HTTP
      await _controller.loadRequest(Uri.parse('http://127.0.0.1:$port/index.html'));
    } catch (e) {
      if (mounted) {
        setState(() {
          _errorMessage = e.toString();
          _isLoading = false;
        });
      }
    }
  }

  @override
  void dispose() {
    _localServer.stop();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (bool didPop, dynamic result) async {
        if (didPop) return;
        if (await _controller.canGoBack()) {
          await _controller.goBack();
        } else {
          if (context.mounted) {
            SystemNavigator.pop();
          }
        }
      },
      child: Scaffold(
        backgroundColor: const Color(0xFF020408),
        body: SafeArea(
          bottom: false,
          child: Stack(
            children: [
              if (_errorMessage != null)
                Center(
                  child: Padding(
                    padding: const EdgeInsets.all(24.0),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Icon(Icons.error_outline, color: Colors.redAccent, size: 48),
                        const SizedBox(height: 16),
                        Text(
                          'Initialization error: $_errorMessage',
                          textAlign: TextAlign.center,
                          style: const TextStyle(color: Colors.white70, fontSize: 13),
                        ),
                        const SizedBox(height: 16),
                        ElevatedButton(
                          onPressed: _initWebViewAndServer,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF1EA599),
                            foregroundColor: Colors.white,
                          ),
                          child: const Text('Retry'),
                        ),
                      ],
                    ),
                  ),
                )
              else
                WebViewWidget(controller: _controller),
              if (_isLoading && _errorMessage == null)
                Positioned(
                  top: 0,
                  left: 0,
                  right: 0,
                  child: LinearProgressIndicator(
                    value: _loadingProgress > 0 ? _loadingProgress : null,
                    backgroundColor: Colors.transparent,
                    valueColor: const AlwaysStoppedAnimation<Color>(
                      Color(0xFF1EA599),
                    ),
                    minHeight: 2.5,
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
