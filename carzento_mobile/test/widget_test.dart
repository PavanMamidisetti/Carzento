import 'package:flutter_test/flutter_test.dart';
import 'package:carzento_mobile/main.dart';

void main() {
  testWidgets('CarzentoApp smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(const CarzentoApp());
    expect(find.byType(CarzentoApp), findsOneWidget);
  });
}
