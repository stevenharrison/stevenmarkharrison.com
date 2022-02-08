---
Title: Interacting with files
Tags: ['Python', 'Files']
---
# Files in Python

Reading data from a file is easy in python. This is done using the **open(filepath, mode)** function. The filepath parameter is a string, which contain the path to the file. The mode is a string which defines how you are going to use the file:

| Mode | Use |
|------|-----|
| r | This mode is used to read from a file |

    filename = "myfile.txt"

    # Using 'with' automatically closes the file onces the block ends
    # 
    with open(filename, "r") as f:
        # To read the lines into a list
        line_list = f.readlines()

    # If you are not using 'with'
    f = open(filename, "r")


Using the with statement block or closing the file manually is important. 
- The python garbage collector will do it for you eventually, but it is best to do it as soon as you don't need it anymore. This is to free up resources, and allow another process to use the file if necessary.
- Data may not be written to disk until the file is closed.
- The OS may limit the process on how many files handles it has open.  
- Using with also handles exceptions and makes the code easy to read. All the file interaction is happening in an indented block.