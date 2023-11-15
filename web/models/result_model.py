from django.db import models
from .round_model import Round

class Result(models.Model):
    round  = models.ForeignKey(Round, on_delete=models.CASCADE)
    number = models.IntegerField("resultado")

    def __str__(self):
        return self.round.date.strftime("%d/%m/%Y %H:%M") + " - " + str(self.number)