from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render
from .forms.form_register import RegisterForm
from .forms.form_login import LoginForm
from .models.user_model import User
from django.http import HttpResponseRedirect
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login, logout as auth_logout
from django.contrib.auth.decorators import login_required

@login_required(redirect_field_name="")
def index(request):
    return render(request, 'index.html') 

def register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid() and form.validate_fields():
            user = User.objects.create_user(
                cpf=form.cleaned_data['cpf'],
                name=form.cleaned_data['name'],
                email=form.cleaned_data['email'],
                password=form.cleaned_data['password']
            )
            return HttpResponseRedirect("/")
    else:
        form = RegisterForm()
    
    return render(request, 'register.html', {'form': form, 'title': 'Cadastro', 'button' : 'Cadastrar'})    

def logout(request):
    auth_logout(request)
    return HttpResponseRedirect("/login/")

def login(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect("/")
    
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid() and form.validate_fields():
            user = authenticate(
                cpf     =form.cleaned_data['cpf'],
                password=form.cleaned_data['password']
            )

            if (user is not None):
                auth_login(request, user)
                return HttpResponseRedirect("/")
            else:
                form.add_error('password', 'Usuário ou senha incorretos')
    else:
        form = LoginForm()
    
    return render(request, 'register.html', {'form': form, 'title': 'Login', 'button': 'Entrar'})    