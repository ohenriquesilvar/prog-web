# rabbitmq_consumer.py
import pika
from django.conf import settings

def callback(ch, method, properties, body):
    print(f" [x] Received {body}")

class RabbitMQConsumer:
    def __init__(self, queue_name):
        print(settings.RABBITMQ_URL)
        self.connection = pika.BlockingConnection(pika.URLParameters(settings.RABBITMQ_URL))
        self.channel = self.connection.channel()
        self.channel.queue_declare(queue=queue_name)
        self.channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=True)

    def start_consuming(self):
        print(' [*] Waiting for messages. To exit, press CTRL+C')
        self.channel.start_consuming()

    def close_connection(self):
        self.connection.close()
