from django.db import models

class User(models.Model):
    cpf = models.CharField(max_length=11)
    name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    password = models.CharField(max_length=16)

class Round(models.Model):
    date = models.DateTimeField("data sorteio")
    valor = models.FloatField("valor")

class Bet(models.Model):
    user  = models.ForeignKey(User, on_delete=models.CASCADE)
    round = models.ForeignKey(Round, on_delete=models.CASCADE)
    group = models.IntegerField("grupo apostado")
    value = models.IntegerField("valor")

class Result(models.Model):
    round  = models.ForeignKey(Round, on_delete=models.CASCADE)
    number = models.IntegerField("resultado")