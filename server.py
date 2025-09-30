from fastapi import FastAPI,Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from dotenv import load_dotenv
import uvicorn

load_dotenv()

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
origins = [
    "http://localhost:5000",
    "http://127.0.0.1:5000"
]
templates = Jinja2Templates(directory="templates")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def index(request:Request):
    return templates.TemplateResponse(request=request,name="index.html")

@app.get('/blog')
def search(request:Request):
    return templates.TemplateResponse(request=request,name="blog.html")

@app.get('/store')
def search(request:Request):
    return templates.TemplateResponse(request=request,name="store.html")


if __name__=="__main__":
    uvicorn.run(app,host="0.0.0.0",port=8000)
