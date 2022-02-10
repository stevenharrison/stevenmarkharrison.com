---
Id: 3d483bf5-6d57-40f0-8075-d253764a63ad
Title: Python Data Structures
Tags: [Python, 'Data Structures']
Articles:
  - https://towardsdatascience.com/which-python-data-structure-should-you-use-fa1edd82946c
  - https://docs.python.org/3/tutorial/datastructures.html
Published: true
PublishedOn: '2022-02-09'
---
# Python Data Structures

Python makes working with data relatively straight forward through its data structures. As a weakly and dynamically typed language, the programmer does not need to concern themselves with memory and allocation, which is pragmatic when writing code for data engineering. In python, there are primitive and non-primitive types. Primitive types are the most basic level at which data can be stored, non-primitive types will be composed of primitive types. Primitive types are Integer, Float, String, and Boolean, which should be familiar to those with any programming experience. 

Non-primitive types are where the major benefits in using python for data engineering is found. The four built in non-primitive data structures are described in the following sections.

Then there are also **collections**

To check what the type of an object is you can use:

    print(type(obj)) # <class 'list'>
    isinstance(obj, list) # True if obj is list

Other useful data functions
    map()
    zip()

## General Built-In Data Structures 

### Lists

Lists represent a mutable sequence of items that are non-unique and ordered.

    # Creating lists
    new_list = []               # Creates an empty list
    new_list = list()           # Also creates empty list, can provide initial values with list((val1, val2, val3))
    new_list = [1, 2, "String"] # Creates a list with some values

    # Interacting with Lists
    print(new_list[1])          # prints the second item of a list (0 indexed)
    new_list[1] = "new_val"     # Changes the value of the second item
    new_list.append("appended") # inserts a new value on the end of a list
    new_list[1:3]               # Return [2, "String"]
    len(new_list)               # Returns number of elements
    new_list.count("String")    # Counts the instances of "String"
    ", ".join(new_list)         # Creates commma separated string of list elements
    new_list.sort()             # Sorts the list, cannot sort if there are different types

    new_list.extend(other_list) # merges two lists
    new_list += other_list      # Also merges

    new_list.insert(1, "val")   # inserts a value at the 2nd position, shifting those ahead of it forward by 1
    mew_list.remove(1)          # Remove the first instance of 1 found (ValueError if not found)
    new_list.pop()              # Returns and removes the last element in the list (can also provide an index as a parameter)
    del new_list[1]             # Delete second element from the list
    new_list.clear()            # Removes all items

A significant use case of lists in data engineering is to hold complex data structures. Since lists can hold any type, they can hold other data structures and this flexibility is very useful when performing ETL activities. 

Lists are usually accessed via iteration.

Lists can be easily used as stacks and queues. 

#### List Comprehension

List comprehensions are concise tool to create lists. The example given in the python documentation works well:

    squares = []
    for x in range(10):
        squares.append(x**2)

or 

    squares = [x**2 for x in range(10)]

You can also add an if statement

    squares = [x**2 for x in range(10) if x % 2 == 0]

### Dictionaries

Combined with lists, dictionaries are a significant tool in the python data engineer's hand. Dictionaries are comprised of key/value pairs. The key can be any immutable type, e.g. strings and numbers. Values can be any object. The keys in a dictionary must be unique. 

    new_dict = { 'key1' : 'val1', 'key2' : 'val2' }
    print(new_dict['key1'])
    extracted_val = new_dict['key1']
    extracted_val = new_dict.get('key3', None) # Safely returns None
    del new_dict['key1']
    list(new_dict) # returns a list of keys in inserted order
    sorted(new_dict) # returns a sorted list of keys
    'key1' in new_dict # false
    'key1' not in new_dict # true

    dict([('key1', 'val1'), ('key2', 'val2'), ('key3', 'val3')])

### Sets

Where lists are ordered and non-unique, sets are unordered and unique. They can be used for eliminating duplicate entries in a list.

Set objects support mathematical operations:
- union
- intersection
- difference
- symmetric difference


    empty_set = set()
    initialised_set = { 'one', 'two', 'three' }
    test = 'four' in initialised_set # False

    empty_set.update(['one', 'two']) # Add items to set if they don't already exist

Set comprehension is available.


### Tuples

Tuples are similar to lists, except they are immutable, you cannot change them. When considering whether to use a tuple or a list, you may want to consider:

- Immutability is a useful. Not part of the program can change the value (though since this is python another part of the program could easily overwrite that variable with another tuple)
- Dictionary keys can be tuples. This is useful if you want to have more than one value as a key.
- Tuples use less memory than lists.
- TUples can hold mutable objects such as lists
- A common use of tuples is with **unpacking**

    #Initialising a Tuple
    new_tuple = 1,2,3,'Test'
    or_new_tuple = (1,2,3,'Test')

Also see **namedtuples**

## Specialised Containers

Python also provides more specialised data structures (https://docs.python.org/3/library/collections.html)

- ChainMap: A ChainMap groups multiple dicts or other mappings together to create a single, updateable view. The underlying mappings are stored in a list (contains in the 'maps' property). 
  - Need More research
- Counter: A counter is a dict subclass for counting hashable objects. Elements are stored as keys, counts as values. 
- deque: Deques are a generalisation of stacks and queues. Can pop from either side. More efficient that using a list.
- defaultdict: 
- namedtuple: Allow access to tuple fields by name and not just index.
- OrderedDict

## Objects

If you can't find a data structure that suits your needs, you can make one with python's class functionality.

    class MyClass:
        def __init__(self, param1, param2, param3):
            self.param1 = param1
            self.param2 = param2
            self.param3 = param3
        
        def classFunc(self):
            pass

    myObj = MyClass(1, 2, 3)
    myObj.param2 = 5