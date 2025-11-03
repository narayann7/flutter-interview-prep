---
id: buildcontext_and_lifecycle
title: BuildContext and Lifecycle
sidebar_label: BuildContext and Lifecycle
sidebar_position: 1
tags: [Intermediate, Widgets]
description: Explanation of BuildContext and the widget lifecycle in Flutter.
keywords: [Flutter, BuildContext, Lifecycle]
---

---

### **1. What is BuildContext in Flutter?**

`BuildContext` is a reference to the location of a widget in the widget tree.
Every widget receives its own context when it's built and this context contains important information about the widget's position in the tree and provides access to various services and inherited widgets.

**Key points:**

- Represents a widget’s position in the widget tree.
- Helps access inherited widgets like `Theme`, `MediaQuery`, `Provider`, etc.
- Used for navigation and theming.
- Identifies which widget needs rebuilding when state changes.

**Example:**

```dart
final theme = Theme.of(context);
final size = MediaQuery.of(context).size;
Navigator.of(context).push(MaterialPageRoute(builder: (_) => SecondPage()));
final user = Provider.of<UserModel>(context);
```

**Important rules:**

- Don’t use a `BuildContext` that belongs to a widget that has been disposed.
- Avoid calling `Scaffold.of(context)` or `Navigator.of(context)` from a context that doesn’t have the proper ancestor.

---

### **2. What are the different app lifecycle states in Flutter?**

Flutter defines four app lifecycle states through the `AppLifecycleState` enum:

| State      | Description                                             |
| ---------- | ------------------------------------------------------- |
| `resumed`  | App is visible and responsive                           |
| `inactive` | App is in the foreground but not interactive (iOS only) |
| `paused`   | App is in the background                                |
| `detached` | App is terminated or suspended                          |

**Example:**

```dart
class MyAppState extends State<MyApp> with WidgetsBindingObserver {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    print('Current state: $state');
  }
}
```

---

### **3. What is the lifecycle of a StatefulWidget in Flutter?**

Each `StatefulWidget` goes through several lifecycle methods:

| Method                    | Called When                              | Purpose                                 |
| ------------------------- | ---------------------------------------- | --------------------------------------- |
| `createState()`           | When widget is inserted into the tree    | Creates the `State` object              |
| `initState()`             | Once when state is created               | Initialize controllers, listeners, etc. |
| `didChangeDependencies()` | After `initState()` or dependency change | Access inherited widgets                |
| `build()`                 | On every rebuild                         | Returns widget UI                       |
| `didUpdateWidget()`       | When parent rebuilds and widget changes  | Compare new and old widget              |
| `setState()`              | When state changes                       | Triggers rebuild                        |
| `deactivate()`            | When removed from the tree temporarily   | May be reinserted later                 |
| `dispose()`               | When removed permanently                 | Cleanup (controllers, streams, etc.)    |

**Lifecycle flow:**

```
createState() → initState() → didChangeDependencies() → build()
(setState() → build()) → deactivate() → dispose()
```

**Example:**

```dart
class MyWidgetState extends State<MyWidget> {
  @override
  void initState() {
    super.initState();
    print("Initialized");
  }

  @override
  Widget build(BuildContext context) {
    print("Built");
    return Container();
  }

  @override
  void dispose() {
    print("Disposed");
    super.dispose();
  }
}
```
