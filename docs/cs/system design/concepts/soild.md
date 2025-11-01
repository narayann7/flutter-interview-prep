# SOLID Principles in Java

## Table of Contents

1. Introduction
2. Single Responsibility Principle (SRP)
3. Open/Closed Principle (OCP)
4. Liskov Substitution Principle (LSP)
5. Interface Segregation Principle (ISP)
6. Dependency Inversion Principle (DIP)
7. Summary

---

## Introduction

SOLID is an acronym for five design principles intended to make object-oriented software more understandable, flexible, and maintainable. These principles were introduced by Robert C. Martin (Uncle Bob) and are fundamental to writing clean, scalable code.

**SOLID stands for:**

- **S** - Single Responsibility Principle
- **O** - Open/Closed Principle
- **L** - Liskov Substitution Principle
- **I** - Interface Segregation Principle
- **D** - Dependency Inversion Principle

---

## Single Responsibility Principle (SRP)

### Definition

A class should have only one reason to change, meaning it should have only one job or responsibility.

### Why It Matters

- Makes code easier to understand and maintain
- Reduces coupling between different parts of the system
- Makes testing simpler
- Changes in one responsibility don't affect others

### Bad Example (Violates SRP)

```java
// This class has multiple responsibilities: user data management, 
// validation, email sending, and database operations
public class User {
    private String name;
    private String email;
    
    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }
    
    // Responsibility 1: Data validation
    public boolean validateEmail() {
        return email.contains("@") && email.contains(".");
    }
    
    // Responsibility 2: Database operations
    public void saveToDatabase() {
        // Database connection logic
        System.out.println("Saving user to database...");
        // SQL insert logic
    }
    
    // Responsibility 3: Email sending
    public void sendWelcomeEmail() {
        System.out.println("Sending welcome email to " + email);
        // Email sending logic
    }
    
    // Responsibility 4: Report generation
    public String generateReport() {
        return "User Report: " + name + " (" + email + ")";
    }
}
```

### Good Example (Follows SRP)

```java
// Each class has a single, well-defined responsibility

// Responsibility: Hold user data
public class User {
    private String name;
    private String email;
    
    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }
    
    public String getName() {
        return name;
    }
    
    public String getEmail() {
        return email;
    }
}

// Responsibility: Validate user data
public class UserValidator {
    public boolean isValidEmail(String email) {
        return email != null && email.contains("@") && email.contains(".");
    }
    
    public boolean isValidName(String name) {
        return name != null && !name.trim().isEmpty();
    }
}

// Responsibility: Database operations for users
public class UserRepository {
    public void save(User user) {
        System.out.println("Saving user to database: " + user.getName());
        // Database logic here
    }
    
    public User findByEmail(String email) {
        // Retrieval logic
        return null;
    }
}

// Responsibility: Send emails to users
public class UserEmailService {
    public void sendWelcomeEmail(User user) {
        System.out.println("Sending welcome email to: " + user.getEmail());
        // Email sending logic
    }
}

// Responsibility: Generate reports about users
public class UserReportGenerator {
    public String generateReport(User user) {
        return "User Report: " + user.getName() + " (" + user.getEmail() + ")";
    }
}
```

---

## Open/Closed Principle (OCP)

### Definition

Software entities (classes, modules, functions) should be open for extension but closed for modification.

### Why It Matters

- Existing code remains stable and tested
- New features can be added without risking bugs in existing code
- Promotes code reusability
- Easier to maintain large codebases

### Bad Example (Violates OCP)

```java
// This class needs modification every time a new shape is added
public class AreaCalculator {
    public double calculateArea(Object shape) {
        if (shape instanceof Circle) {
            Circle circle = (Circle) shape;
            return Math.PI * circle.getRadius() * circle.getRadius();
        } else if (shape instanceof Rectangle) {
            Rectangle rectangle = (Rectangle) shape;
            return rectangle.getWidth() * rectangle.getHeight();
        } else if (shape instanceof Triangle) {
            // Need to modify this class to add Triangle support
            Triangle triangle = (Triangle) shape;
            return 0.5 * triangle.getBase() * triangle.getHeight();
        }
        // Every new shape requires modifying this method
        return 0;
    }
}

class Circle {
    private double radius;
    
    public Circle(double radius) {
        this.radius = radius;
    }
    
    public double getRadius() {
        return radius;
    }
}

class Rectangle {
    private double width;
    private double height;
    
    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }
    
    public double getWidth() {
        return width;
    }
    
    public double getHeight() {
        return height;
    }
}
```

### Good Example (Follows OCP)

```java
// Abstract base that's closed for modification but open for extension
public interface Shape {
    double calculateArea();
}

// Each shape extends functionality without modifying existing code
public class Circle implements Shape {
    private double radius;
    
    public Circle(double radius) {
        this.radius = radius;
    }
    
    @Override
    public double calculateArea() {
        return Math.PI * radius * radius;
    }
}

public class Rectangle implements Shape {
    private double width;
    private double height;
    
    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }
    
    @Override
    public double calculateArea() {
        return width * height;
    }
}

public class Triangle implements Shape {
    private double base;
    private double height;
    
    public Triangle(double base, double height) {
        this.base = base;
        this.height = height;
    }
    
    @Override
    public double calculateArea() {
        return 0.5 * base * height;
    }
}

// Calculator doesn't need modification when new shapes are added
public class AreaCalculator {
    public double calculateArea(Shape shape) {
        return shape.calculateArea();
    }
    
    public double calculateTotalArea(List<Shape> shapes) {
        return shapes.stream()
                     .mapToDouble(Shape::calculateArea)
                     .sum();
    }
}

// Usage example
public class OCPDemo {
    public static void main(String[] args) {
        AreaCalculator calculator = new AreaCalculator();
        
        List<Shape> shapes = Arrays.asList(
            new Circle(5),
            new Rectangle(4, 6),
            new Triangle(3, 8)
        );
        
        double totalArea = calculator.calculateTotalArea(shapes);
        System.out.println("Total area: " + totalArea);
    }
}
```

---

## Liskov Substitution Principle (LSP)

### Definition

Objects of a superclass should be replaceable with objects of its subclasses without breaking the application. Subtypes must be substitutable for their base types.

### Why It Matters

- Ensures proper inheritance hierarchies
- Prevents unexpected behavior when using polymorphism
- Makes code more predictable and reliable
- Enables true polymorphic behavior

### Bad Example (Violates LSP)

```java
// Base class with flying behavior
public class Bird {
    public void fly() {
        System.out.println("Flying in the sky");
    }
}

// Penguin is a bird but can't fly - violates LSP
public class Penguin extends Bird {
    @Override
    public void fly() {
        throw new UnsupportedOperationException("Penguins can't fly!");
    }
}

public class Ostrich extends Bird {
    @Override
    public void fly() {
        throw new UnsupportedOperationException("Ostriches can't fly!");
    }
}

// This code will break when given a Penguin or Ostrich
public class BirdWatcher {
    public void makeBirdFly(Bird bird) {
        bird.fly(); // Will throw exception for Penguin/Ostrich
    }
}
```

### Good Example (Follows LSP)

```java
// Better abstraction that doesn't assume all birds fly
public abstract class Bird {
    private String name;
    
    public Bird(String name) {
        this.name = name;
    }
    
    public void eat() {
        System.out.println(name + " is eating");
    }
    
    public abstract void move();
}

// Separate interface for flying behavior
public interface Flyable {
    void fly();
}

// Birds that can fly implement Flyable
public class Sparrow extends Bird implements Flyable {
    public Sparrow() {
        super("Sparrow");
    }
    
    @Override
    public void move() {
        fly();
    }
    
    @Override
    public void fly() {
        System.out.println("Sparrow is flying");
    }
}

public class Eagle extends Bird implements Flyable {
    public Eagle() {
        super("Eagle");
    }
    
    @Override
    public void move() {
        fly();
    }
    
    @Override
    public void fly() {
        System.out.println("Eagle is soaring high");
    }
}

// Birds that can't fly don't implement Flyable
public class Penguin extends Bird {
    public Penguin() {
        super("Penguin");
    }
    
    @Override
    public void move() {
        swim();
    }
    
    public void swim() {
        System.out.println("Penguin is swimming");
    }
}

public class Ostrich extends Bird {
    public Ostrich() {
        super("Ostrich");
    }
    
    @Override
    public void move() {
        run();
    }
    
    public void run() {
        System.out.println("Ostrich is running");
    }
}

// Now we can work with different bird types safely
public class BirdWatcher {
    public void observeBirdMovement(Bird bird) {
        bird.move(); // Works for all bird types
    }
    
    public void makeFlyableBirdFly(Flyable flyable) {
        flyable.fly(); // Only accepts birds that can fly
    }
}
```

### Another LSP Example: Rectangle-Square Problem

```java
// Bad Example (Violates LSP)
class Rectangle {
    protected int width;
    protected int height;
    
    public void setWidth(int width) {
        this.width = width;
    }
    
    public void setHeight(int height) {
        this.height = height;
    }
    
    public int getArea() {
        return width * height;
    }
}

class Square extends Rectangle {
    @Override
    public void setWidth(int width) {
        this.width = width;
        this.height = width; // Square must have equal sides
    }
    
    @Override
    public void setHeight(int height) {
        this.width = height;
        this.height = height; // Square must have equal sides
    }
}

// This test passes for Rectangle but fails for Square
class LSPViolationTest {
    public void testArea(Rectangle rectangle) {
        rectangle.setWidth(5);
        rectangle.setHeight(4);
        assert rectangle.getArea() == 20; // Fails for Square (would be 16)
    }
}

// Good Example (Follows LSP)
interface Shape {
    int getArea();
}

class Rectangle implements Shape {
    private int width;
    private int height;
    
    public Rectangle(int width, int height) {
        this.width = width;
        this.height = height;
    }
    
    @Override
    public int getArea() {
        return width * height;
    }
}

class Square implements Shape {
    private int side;
    
    public Square(int side) {
        this.side = side;
    }
    
    @Override
    public int getArea() {
        return side * side;
    }
}
```

---

## Interface Segregation Principle (ISP)

### Definition

Clients should not be forced to depend on interfaces they do not use. Many specific interfaces are better than one general-purpose interface.

### Why It Matters

- Prevents "fat" interfaces with unnecessary methods
- Reduces the impact of changes
- Makes code more flexible and maintainable
- Improves code readability and understanding

### Bad Example (Violates ISP)

```java
// Fat interface with too many responsibilities
public interface Worker {
    void work();
    void eat();
    void sleep();
    void attendMeeting();
    void submitReport();
    void fixMachinery();
}

// Human worker can implement all methods
public class HumanWorker implements Worker {
    @Override
    public void work() {
        System.out.println("Human is working");
    }
    
    @Override
    public void eat() {
        System.out.println("Human is eating");
    }
    
    @Override
    public void sleep() {
        System.out.println("Human is sleeping");
    }
    
    @Override
    public void attendMeeting() {
        System.out.println("Human is attending meeting");
    }
    
    @Override
    public void submitReport() {
        System.out.println("Human is submitting report");
    }
    
    @Override
    public void fixMachinery() {
        System.out.println("Human is fixing machinery");
    }
}

// Robot worker is forced to implement methods it doesn't need
public class RobotWorker implements Worker {
    @Override
    public void work() {
        System.out.println("Robot is working");
    }
    
    @Override
    public void eat() {
        // Robots don't eat - forced to implement anyway
        throw new UnsupportedOperationException("Robots don't eat");
    }
    
    @Override
    public void sleep() {
        // Robots don't sleep - forced to implement anyway
        throw new UnsupportedOperationException("Robots don't sleep");
    }
    
    @Override
    public void attendMeeting() {
        throw new UnsupportedOperationException("Robots don't attend meetings");
    }
    
    @Override
    public void submitReport() {
        throw new UnsupportedOperationException("Robots don't submit reports");
    }
    
    @Override
    public void fixMachinery() {
        System.out.println("Robot is fixing machinery");
    }
}
```

### Good Example (Follows ISP)

```java
// Segregated interfaces - each with specific responsibility
public interface Workable {
    void work();
}

public interface Eatable {
    void eat();
}

public interface Sleepable {
    void sleep();
}

public interface MeetingAttendable {
    void attendMeeting();
}

public interface ReportSubmittable {
    void submitReport();
}

public interface MachineryFixable {
    void fixMachinery();
}

// Human worker implements only relevant interfaces
public class HumanWorker implements Workable, Eatable, Sleepable, 
                                     MeetingAttendable, ReportSubmittable {
    @Override
    public void work() {
        System.out.println("Human is working");
    }
    
    @Override
    public void eat() {
        System.out.println("Human is eating");
    }
    
    @Override
    public void sleep() {
        System.out.println("Human is sleeping");
    }
    
    @Override
    public void attendMeeting() {
        System.out.println("Human is attending meeting");
    }
    
    @Override
    public void submitReport() {
        System.out.println("Human is submitting report");
    }
}

// Robot worker implements only what it needs
public class RobotWorker implements Workable, MachineryFixable {
    @Override
    public void work() {
        System.out.println("Robot is working 24/7");
    }
    
    @Override
    public void fixMachinery() {
        System.out.println("Robot is fixing machinery");
    }
}

// Manager implements administrative interfaces
public class Manager implements Workable, Eatable, Sleepable, 
                                MeetingAttendable, ReportSubmittable {
    @Override
    public void work() {
        System.out.println("Manager is managing");
    }
    
    @Override
    public void eat() {
        System.out.println("Manager is having lunch");
    }
    
    @Override
    public void sleep() {
        System.out.println("Manager is sleeping");
    }
    
    @Override
    public void attendMeeting() {
        System.out.println("Manager is conducting meeting");
    }
    
    @Override
    public void submitReport() {
        System.out.println("Manager is reviewing report");
    }
}

// Mechanic implements technical interfaces
public class Mechanic implements Workable, Eatable, Sleepable, MachineryFixable {
    @Override
    public void work() {
        System.out.println("Mechanic is working");
    }
    
    @Override
    public void eat() {
        System.out.println("Mechanic is eating");
    }
    
    @Override
    public void sleep() {
        System.out.println("Mechanic is sleeping");
    }
    
    @Override
    public void fixMachinery() {
        System.out.println("Mechanic is fixing machinery");
    }
}
```

### Another ISP Example: Document Operations

```java
// Bad Example (Violates ISP)
interface Document {
    void open();
    void save();
    void close();
    void print();
    void fax();
    void scan();
}

// ReadOnlyDocument is forced to implement methods it shouldn't
class ReadOnlyDocument implements Document {
    public void open() { /* implementation */ }
    public void close() { /* implementation */ }
    
    public void save() {
        throw new UnsupportedOperationException("Read-only document");
    }
    
    public void print() {
        throw new UnsupportedOperationException("Printing not supported");
    }
    
    public void fax() {
        throw new UnsupportedOperationException("Faxing not supported");
    }
    
    public void scan() {
        throw new UnsupportedOperationException("Scanning not supported");
    }
}

// Good Example (Follows ISP)
interface Readable {
    void open();
    void close();
}

interface Writable {
    void save();
}

interface Printable {
    void print();
}

interface Faxable {
    void fax();
}

interface Scannable {
    void scan();
}

class ReadOnlyDocument implements Readable {
    public void open() {
        System.out.println("Opening read-only document");
    }
    
    public void close() {
        System.out.println("Closing read-only document");
    }
}

class EditableDocument implements Readable, Writable {
    public void open() {
        System.out.println("Opening editable document");
    }
    
    public void save() {
        System.out.println("Saving document");
    }
    
    public void close() {
        System.out.println("Closing document");
    }
}

class MultiFunctionDocument implements Readable, Writable, Printable, Scannable {
    public void open() { /* implementation */ }
    public void save() { /* implementation */ }
    public void close() { /* implementation */ }
    public void print() { /* implementation */ }
    public void scan() { /* implementation */ }
}
```

---

## Dependency Inversion Principle (DIP)

### Definition

High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details. Details should depend on abstractions.

### Why It Matters

- Reduces coupling between modules
- Makes code more flexible and easier to change
- Facilitates testing through dependency injection
- Promotes modular architecture

### Bad Example (Violates DIP)

```java
// Low-level module (concrete implementation)
public class MySQLDatabase {
    public void connect() {
        System.out.println("Connecting to MySQL database");
    }
    
    public void saveData(String data) {
        System.out.println("Saving data to MySQL: " + data);
    }
}

// High-level module depends directly on low-level module
public class UserService {
    private MySQLDatabase database; // Direct dependency on concrete class
    
    public UserService() {
        this.database = new MySQLDatabase(); // Tight coupling
    }
    
    public void saveUser(String userData) {
        database.connect();
        database.saveData(userData);
    }
}

// Problems:
// 1. UserService is tightly coupled to MySQLDatabase
// 2. Cannot easily switch to PostgreSQL or MongoDB
// 3. Difficult to test UserService in isolation
// 4. Changes to MySQLDatabase may break UserService
```

### Good Example (Follows DIP)

```java
// Abstraction (interface) that both high and low level modules depend on
public interface Database {
    void connect();
    void saveData(String data);
}

// Low-level modules implement the abstraction
public class MySQLDatabase implements Database {
    @Override
    public void connect() {
        System.out.println("Connecting to MySQL database");
    }
    
    @Override
    public void saveData(String data) {
        System.out.println("Saving data to MySQL: " + data);
    }
}

public class PostgreSQLDatabase implements Database {
    @Override
    public void connect() {
        System.out.println("Connecting to PostgreSQL database");
    }
    
    @Override
    public void saveData(String data) {
        System.out.println("Saving data to PostgreSQL: " + data);
    }
}

public class MongoDBDatabase implements Database {
    @Override
    public void connect() {
        System.out.println("Connecting to MongoDB database");
    }
    
    @Override
    public void saveData(String data) {
        System.out.println("Saving data to MongoDB: " + data);
    }
}

// High-level module depends on abstraction, not concrete implementation
public class UserService {
    private Database database; // Depends on interface
    
    // Dependency injection through constructor
    public UserService(Database database) {
        this.database = database;
    }
    
    public void saveUser(String userData) {
        database.connect();
        database.saveData(userData);
    }
}

// Usage demonstrates flexibility
public class DIPDemo {
    public static void main(String[] args) {
        // Easy to switch between different database implementations
        Database mysqlDb = new MySQLDatabase();
        UserService userService1 = new UserService(mysqlDb);
        userService1.saveUser("John Doe");
        
        // Can switch to PostgreSQL without changing UserService
        Database postgresDb = new PostgreSQLDatabase();
        UserService userService2 = new UserService(postgresDb);
        userService2.saveUser("Jane Smith");
        
        // Can switch to MongoDB
        Database mongoDb = new MongoDBDatabase();
        UserService userService3 = new UserService(mongoDb);
        userService3.saveUser("Bob Johnson");
    }
}
```

### Another DIP Example: Notification System

```java
// Bad Example (Violates DIP)
class EmailSender {
    public void sendEmail(String message) {
        System.out.println("Sending email: " + message);
    }
}

class NotificationService {
    private EmailSender emailSender; // Tight coupling
    
    public NotificationService() {
        this.emailSender = new EmailSender();
    }
    
    public void notify(String message) {
        emailSender.sendEmail(message);
    }
}

// Good Example (Follows DIP)
interface MessageSender {
    void sendMessage(String message);
}

class EmailSender implements MessageSender {
    @Override
    public void sendMessage(String message) {
        System.out.println("Sending email: " + message);
    }
}

class SMSSender implements MessageSender {
    @Override
    public void sendMessage(String message) {
        System.out.println("Sending SMS: " + message);
    }
}

class PushNotificationSender implements MessageSender {
    @Override
    public void sendMessage(String message) {
        System.out.println("Sending push notification: " + message);
    }
}

class NotificationService {
    private MessageSender messageSender; // Depends on abstraction
    
    public NotificationService(MessageSender messageSender) {
        this.messageSender = messageSender;
    }
    
    public void notify(String message) {
        messageSender.sendMessage(message);
    }
}

// Usage with different implementations
class NotificationDemo {
    public static void main(String[] args) {
        // Email notifications
        NotificationService emailNotifier = 
            new NotificationService(new EmailSender());
        emailNotifier.notify("Your order has shipped");
        
        // SMS notifications
        NotificationService smsNotifier = 
            new NotificationService(new SMSSender());
        smsNotifier.notify("Your verification code is 123456");
        
        // Push notifications
        NotificationService pushNotifier = 
            new NotificationService(new PushNotificationSender());
        pushNotifier.notify("You have a new message");
    }
}
```

### DIP with Dependency Injection Frameworks

```java
// Using Spring Framework for Dependency Injection
import org.springframework.stereotype.Service;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

@Component
interface PaymentProcessor {
    void processPayment(double amount);
}

@Component
class StripePaymentProcessor implements PaymentProcessor {
    @Override
    public void processPayment(double amount) {
        System.out.println("Processing payment of $" + amount + " via Stripe");
    }
}

@Component
class PayPalPaymentProcessor implements PaymentProcessor {
    @Override
    public void processPayment(double amount) {
        System.out.println("Processing payment of $" + amount + " via PayPal");
    }
}

@Service
class OrderService {
    private final PaymentProcessor paymentProcessor;
    
    // Constructor injection (preferred)
    @Autowired
    public OrderService(PaymentProcessor paymentProcessor) {
        this.paymentProcessor = paymentProcessor;
    }
    
    public void placeOrder(double orderAmount) {
        System.out.println("Placing order for $" + orderAmount);
        paymentProcessor.processPayment(orderAmount);
        System.out.println("Order completed");
    }
}
```

---

## Summary

### Quick Reference

|Principle|Key Question|Benefit|
|---|---|---|
|**Single Responsibility**|Does this class have only one reason to change?|Easier to maintain and test|
|**Open/Closed**|Can I add new features without modifying existing code?|Safer to extend functionality|
|**Liskov Substitution**|Can I replace a parent class with any of its children?|Proper inheritance hierarchies|
|**Interface Segregation**|Is this interface forcing clients to implement unused methods?|More flexible interfaces|
|**Dependency Inversion**|Do my classes depend on abstractions or concrete implementations?|Loose coupling, easier testing|

### Benefits of Following SOLID Principles

1. **Maintainability**: Code is easier to understand and modify
2. **Testability**: Components can be tested in isolation
3. **Flexibility**: Systems can adapt to changing requirements
4. **Reusability**: Well-designed components can be reused
5. **Scalability**: Architecture supports growth
6. **Reduced Bugs**: Clear responsibilities reduce errors

### Common Anti-Patterns to Avoid

- **God Classes**: Classes that know too much or do too much (violates SRP)
- **Rigid Code**: Code that requires modifications for extensions (violates OCP)
- **Fragile Base Class**: Subclasses breaking when base class changes (violates LSP)
- **Fat Interfaces**: Interfaces with too many methods (violates ISP)
- **Tight Coupling**: Direct dependencies on concrete classes (violates DIP)

### When to Apply SOLID

While SOLID principles are valuable, they shouldn't be applied blindly:

- **Early in design**: Consider SOLID during architecture phase
- **During refactoring**: Apply when code becomes hard to maintain
- **When extending**: Use when adding new features
- **Not for simple code**: Don't over-engineer simple solutions
- **Balance with pragmatism**: Consider project size and complexity

### Best Practices

1. Start with the simplest solution
2. Refactor when you see patterns emerging
3. Write tests to ensure principles are followed
4. Use design patterns that embody SOLID principles
5. Review code regularly for principle violations
6. Document architectural decisions
7. Balance principles with practical constraints

### Further Learning

- **Design Patterns**: Study patterns like Strategy, Factory, and Observer
- **Clean Code**: Read "Clean Code" by Robert C. Martin
- **Refactoring**: Learn refactoring techniques to improve existing code
- **Code Reviews**: Practice identifying violations in real code
- **TDD**: Use Test-Driven Development to naturally follow SOLID

---

## Conclusion

SOLID principles are foundational to object-oriented design and help create software that is maintainable, flexible, and robust. While they require practice to master, consistently applying these principles leads to cleaner code architecture and more professional software development.

Remember: SOLID principles are guidelines, not strict rules. Use judgment to apply them appropriately based on your specific context and requirements.