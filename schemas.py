from pydantic import BaseModel

class Blog(BaseModel):
    id:str
    title:str
    slug:str
    views:int
    content:str
    display_url:str
    author:str
    date_uploaded:str
    tags:list[str]

class Blogs(BaseModel):
    blogs:list[Blog]


class Product(BaseModel):
    id:str
    title:str
    short_desc:str
    images:list[str]
    date_uploaded:str
    author:str
    link:str
    desc:str

class Products(BaseModel):
    products:list[Product]
    