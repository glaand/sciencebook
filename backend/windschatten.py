from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse
import numpy as np
import asyncio

app = FastAPI()

class DataStream:
    async def recv(self):
        # Generate or obtain your numpy array
        data = np.random.random((250, 250))
        return data.tobytes()

async def send_data(websocket: WebSocket):
    data_stream = DataStream()
    while True:
        data = await data_stream.recv()
        await websocket.send_bytes(data)
        await asyncio.sleep(1)  # Add a delay to control the data sending rate

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    await send_data(websocket)

@app.get("/")
def read_root():
    return HTMLResponse(content=open("index.html").read(), status_code=200)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=10000)
