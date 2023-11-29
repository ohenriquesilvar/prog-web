# myapp/management/commands/consumer_rabbitmq.py

from django.core.management.base import BaseCommand
from web.rabbitmq_consumer import RabbitMQConsumer

class Command(BaseCommand):
    help = 'Starts the RabbitMQ consumer'

    def handle(self, *args, **options):
        queue_name = 'result'  # Substitua pelo nome da fila que você está ouvindo

        consumer = RabbitMQConsumer(queue_name)
        try:
            consumer.start_consuming()
        except KeyboardInterrupt:
            self.stdout.write(self.style.SUCCESS('Exiting consumer...'))
        finally:
            consumer.close_connection()
