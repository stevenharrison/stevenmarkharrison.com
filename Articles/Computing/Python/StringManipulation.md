---
Id: f3642a7b-530f-4c1d-be71-ea90067948ab
Title: Manipulating Strings with Python
PublishedOn: '2022-02-21'
Published: true
Tags: [Python, Strings]
Sources:
    - https://dba.stackexchange.com/questions/148321/list-jobs-schedules-and-next-scheduled-run-datetimes
---
# String Manipulation

### Add timstamp to windows file

```python
from datetime import datetime

d = datetime.now().strftime("%Y-%m-%d_%H_%M_%S_%f")
filename = "Test.txt"
index = filename.rfind(".")
filename = filename[:index] + d + filename[index:]
print(filename)
```