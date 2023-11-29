from django.db import models
from ..managers.manager_user import CustomUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils import timezone

class User(AbstractBaseUser, PermissionsMixin):
    cpf = models.CharField(max_length=11, unique=True)
    name = models.CharField(max_length=50)
    email = models.CharField(max_length=50, unique=True)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    EMAIL_FIELD = "email"
    USERNAME_FIELD = 'cpf'
    REQUIRED_FIELDS = ['name', 'email', 'password']

    objects = CustomUserManager()

    def to_json(self):
        return {
            'cpf': self.cpf,
            'name': self.name,
            'email': self.email,
            'password': '**********'
        }

    def __str__(self):
        return self.email