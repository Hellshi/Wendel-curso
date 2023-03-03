## What is the difference from Adapter to Strategy Pattern? 

Adapter patterns basically allows classes to work together that on their own could not due to incompatible interfaces. Adapter converts the interface of one class into something that may be used by another class.

Similar to how if you travel abroad you need to carry a power adapter to be able to use the wall sockets.

Strategy pattern, on the other hand takes a group of algorithms, and makes them interchangeable (by extending from a common interface). So that whatever class that is going to use the strategy can easily interchange it with another strategy from the group.

In other words, Adapter does not add behavior in any way, it just modifies the existing interface to allow some other class to access the existing functionality.

Strategy pattern on the other hand encapsulates different behavior, and allows them to be switched at run time.