import requests
import tqdm

url = "https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGML/resolve/main/llama-2-7b-chat.ggmlv3.q4_0.bin?download=true"

response = requests.get(url)

open('model/llama-2-7b-chat.ggmlv3.q4_0.bin', 'wb').write(response.content)