from django.db import models

class Round(models.Model):
    date = models.DateTimeField("data sorteio")
    valor = models.FloatField("valor")

    def __str__(self):
        return self.date.strftime("%d/%m/%Y %H:%M")