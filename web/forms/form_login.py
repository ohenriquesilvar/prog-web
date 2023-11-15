from django import forms
import re
from django.core.exceptions import ValidationError


class LoginForm(forms.Form):
    cpf = forms.CharField(max_length=11)
    password = forms.CharField(max_length=16, widget=forms.PasswordInput)

    def validate_fields(self):
        if not re.match(r'^[0-9]{11}$', self.cleaned_data['cpf']):
            self.add_error('cpf', 'CPF inválido')
            return False
        
        if len(self.cleaned_data['password']) < 8:
            self.add_error('password', 'A senha deve ter no mínimo 8 caracteres')
            return False
        
        return True
    