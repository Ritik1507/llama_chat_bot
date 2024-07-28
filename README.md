# Custom Data Chat BOT

## Download the Llama 2 Model:

llama-2-7b-chat.ggmlv3.q4_0.bin


## From the following link:

```
https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGML/tree/main

AND SAVE THE MODEL INSIDE llama_chat_bot/MODEL DIRECTORY 

This can be done using the python script model_download.py
```

```
sh
python model_download.py

PS: As model size if almost 4GB so it will take some time to download 
```

# How to run?
### FRONTEND:

```change to frontend directory 
cd frontend/
```

```To install node module
npm i 
```

```To start react app
npm start
```

### NODE BACKEND:

```change to backend directory 
cd backend/
```

```To install node module
npm i
```

```To start server
node index.js
```

### SETTING PYTHON VIRTUAL ENV:

```CREATE VIRTUAL ENV
conda create -n <env_name> python=3.10.0 -y 
```

```ACTIVATE VIRTUAL ENV
conda activate <env_name>
```


```INSTALL REQUIREMENTS
pip install -r requirements.txt
```

```RUN THE FLASK BACKEND FOR WEBAPP
python app.py
```

## DEMO 
