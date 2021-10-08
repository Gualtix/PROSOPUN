FROM python:3.8
WORKDIR /main
COPY . .
RUN pip install -r requirements.txt
RUN pip install --pre azure-cosmos
RUN pip install --upgrade google-cloud-pubsub
CMD [ "export", "GOOGLE_APPLICATION_CREDENTIALS='./key.json'" ]
CMD [ "python3", "src/main.py" ]