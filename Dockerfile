FROM node:12.13.1-buster-slim
FROM python:3.6

RUN apt-get update

RUN mkdir /app
WORKDIR /app

COPY backend /app/backend
COPY talkengine /app/talkengine
COPY eeyore-0.3-py3-none-any.whl /app/eeyore-0.3-py3-none-any.whl
COPY requirements.txt /app/requirements.txt

RUN pip install --upgrade pip
RUN pip3 install -r backend/requirements.txt
RUN pip3 install -r talkengine/requirements.txt
RUN pip3 install -r requirements.txt
RUN pip3 install eeyore-0.3-py3-none-any.whl

WORKDIR /app/backend
EXPOSE 8080

ENTRYPOINT ["python", "app.py"]







