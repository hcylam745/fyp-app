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


<br/>

The flask server in the server folder does not actually need to be run on your device, if you are testing running the code - it is hosted online. The mobile application already has a link to the existing online hosted API.

<br/>

The client folder contains a react-native mobile application that requests information from the hosted API, and displays information from the hosted API on a floor plan to show the positions and occupancies of free seats in the library.