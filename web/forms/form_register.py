from django import forms
import re
from django.core.exceptions import ValidationError

class RegisterForm(forms.Form):
    cpf = forms.CharField(max_length=11)
    name = forms.CharField(max_length=50)
    email = forms.EmailField(max_length=50)
    password = forms.CharField(max_length=16, widget=forms.PasswordInput)
    password_confirmation = forms.CharField(max_length=16, widget=forms.PasswordInput)

    def validate_fields(self):
        if self.cleaned_data['password'] != self.cleaned_data['password_confirmation']:
            self.add_error('password_confirmation', 'As senhas não conferem')
            return False
        
        if not re.match(r'^[0-9]{11}$', self.cleaned_data['cpf']):
            self.add_error('cpf', 'CPF inválido')
            return False

        if not re.match(r'^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$', self.cleaned_data['email']):
            self.add_error('email', 'Email inválido')
            return False
        
        if len(self.cleaned_data['password']) < 8:
            self.add_error('password', 'A senha deve ter no mínimo 8 caracteres')
            return False
        
        if len(self.cleaned_data['name']) < 3:
            self.add_error('name', 'O nome deve ter no mínimo 3 caracteres')
            return False
        return True
