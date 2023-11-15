from django.db import models
from .user_model import User
from .round_model import Round

class Bet(models.Model):
    user  = models.ForeignKey(User, on_delete=models.CASCADE)
    round = models.ForeignKey(Round, on_delete=models.CASCADE)
    group = models.IntegerField("grupo apostado")
    value = models.IntegerField("valor")

    def __str__(self):
        return self.user.name + " - " + self.round.date.strftime("%d/%m/%Y %H:%M") + " - " + str(self.group) + " - " + str(self.value)
