# Setup Guide

The server folder requires a 'configs.py' file before it can work. This file should be placed in the server folder, not any subfolders.<br/><br/>

Format of config.py shown below:
```python
class Config:
    PostgreSQL_HOST = 'localhost'
    PostgreSQL_USER = 'root'
    PostgreSQL_PASSWORD = "password"
    PostgreSQL_DATABASE = "database_name"
```
<br/>
After creating the configs.py file, create a virtual environment and enter it (optional), then run:<br/><br/>

```
pip install -r requirements.txt
```
