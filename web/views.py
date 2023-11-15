from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render
from .forms.form_register import RegisterForm
from .models.user_model import User
from django.http import HttpResponseRedirect

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

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
    
    return render(request, 'register.html', {'form': form})    

def login(request):
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
    
    return render(request, 'register.html', {'form': form})    