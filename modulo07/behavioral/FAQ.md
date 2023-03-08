## Adapter x Strategy Pattern? 

Adapter patterns basically allows classes to work together that on their own could not due to incompatible interfaces. Adapter converts the interface of one class into something that may be used by another class.

Similar to how if you travel abroad you need to carry a power adapter to be able to use the wall sockets.

Strategy pattern, on the other hand takes a group of algorithms, and makes them interchangeable (by extending from a common interface). So that whatever class that is going to use the strategy can easily interchange it with another strategy from the group.

In other words, Adapter does not add behavior in any way, it just modifies the existing interface to allow some other class to access the existing functionality.

Strategy pattern on the other hand encapsulates different behavior, and allows them to be switched at run time.

## Template Method x Strategy Pattern

The template pattern is used when a particular operation has some invariant behavior(s) that can be defined in terms of other varying primitive behaviors. The abstract class defines the invariant behavior(s), while the implementing classes defined the dependent methods.

In a strategy, the behavior implementations are independent -- each implementing class defines the behavior and there is no code shared between them. Both are behavioral patterns and, as such, are consumed in much the same way by clients. Typically strategies have a single public method -- the execute() method, whereas templates may define a set of public methods as well as a set of supporting private primitives that subclasses must implement.

The two patterns could easily be used together. You might have a strategy pattern where several implementations belong to a family of strategies implemented using a template pattern.