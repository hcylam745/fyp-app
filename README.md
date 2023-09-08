# Setup Guide

The server.py file requires a 'configs.py' file before it can work.<br/><br/>

Format of config.py shown below:
```python
class Config:
    MYSQL_HOST = 'localhost'
    MYSQL_USER = 'root'
    MYSQL_PASSWORD = "password"
    MYSQL_DB = "database_name"
```
<br/>
After creating the configs.py file, create a virtual environment and enter it (optional), then run:<br/><br/>

```
pip install -r requirements.txt
```