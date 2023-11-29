# rabbitmq_producer.py
import pika
from django.conf import settings

class RabbitMQProducer:
    def __init__(self):
        self.connection = pika.BlockingConnection(pika.URLParameters(settings.RABBITMQ_URL))
        self.channel = self.connection.channel()

    def send_message(self, message, queue_name):
        self.channel.queue_declare(queue=queue_name)
        self.channel.basic_publish(exchange='', routing_key=queue_name, body=message)
        print(f" [x] Sent '{message}' to {queue_name}")

    def close_connection(self):
        self.connection.close()
