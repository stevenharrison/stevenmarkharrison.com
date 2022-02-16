---
Id: 9ae8779c-2a90-4e44-8b72-d908892ff49a
Title: Interacting with files
Tags: ['Python', 'Files']
Published: true
PublishedOn: '2022-02-09'
---
# Files in Python

Reading data from a file is easy in python. This is done using the **open(filepath, mode)** function. The filepath parameter is a string, which contain the path to the file. The mode is a string which defines how you are going to use the file (these are the same as the modes in the C Standard Library function fopen()):

| Mode | Use |
|------|-----|
| r | Read from a file |
| r+ | Read and Write to a file |
| w | Write to a new file. An existing file will be truncated |
| w+ | Creates a new file, or truncates an existing one, with read and write functionality. |
| a | Append to an existing file (create if it doesn't exist). Cursor is at the end of the file, so any writes will be appended to the end |
| a+ | Same as 'a' expect you can read as well |


```python
    filename = "myfile.txt"

    # Using 'with' automatically closes the file onces the block ends
    # 
    with open(filename, "r") as f:
        # To read the lines into a list
        line_list = f.readlines()
        # Only read lines up to 100 bytes, and then stop
        line_list = f.readlines(100) 

    # If you are not using 'with'
    f = open(filename, "r")
```

Using the with statement block or closing the file manually is important. 
- The python garbage collector will do it for you eventually, but it is best to do it as soon as you don't need it anymore. This is to free up resources, and allow another process to use the file if necessary.
- Data may not be written to disk until the file is closed.
- The OS may limit the process on how many files handles it has open.  
- Using with also handles exceptions and makes the code easy to read. All the file interaction is happening in an indented block.