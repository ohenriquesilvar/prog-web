from django import forms
import re
from django.core.exceptions import ValidationError


class LoginForm(forms.Form):
    cpf = forms.CharField(max_length=11)
    password = forms.CharField(max_length=16, widget=forms.PasswordInput)
    