from django.db import models
import re
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    cpf = models.CharField(max_length=11)

    def __str__(self):
        return self.username