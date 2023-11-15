from django.db import models
import re

class User(models.Model):
    cpf = models.CharField(max_length=11)
    name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    password = models.CharField(max_length=16)

    def __str__(self):
        return self.name