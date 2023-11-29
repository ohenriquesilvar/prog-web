from django.db import models

class Round(models.Model):
    date = models.DateTimeField("data sorteio")
    valor = models.FloatField("valor")
    id = models.AutoField(primary_key=True)

    def __str__(self):
        return self.date.strftime("%d/%m/%Y %H:%M")