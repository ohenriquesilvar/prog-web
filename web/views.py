from django.shortcuts import render
from django.http import HttpResponse
from .models.user_model import User
from django.http import HttpResponseRedirect
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login, logout as auth_logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def register(request):
    if request.method =='POST':
        body = json.loads(request.body)
        cpf = body['cpf']
        name = body['name']
        email = body['email']
        password = body['password']
        password_confirmation = body['password_confirmation']
    
        if User.objects.filter(cpf=cpf).exists():
            return JsonResponse({'message': 'CPF já cadastrado', 'field' : 'cpf'}, status=400)
        elif User.objects.filter(email=email).exists():
            return JsonResponse({'message': 'Email já cadastrado', 'field' : 'email'}, status=400)
        
        user = User.objects.create_user(
            cpf=cpf,
            name=name,
            email=email,
            password=password
        )
        if user is None:
            return JsonResponse({'message': 'Erro inesperado no cadastro'}, status=400)
        return JsonResponse({'message': 'Usuário criado com sucesso'}, status=201)
    else:
        return JsonResponse({'message': 'Método não permitido'}, status=405)

      
@csrf_exempt
def login(request):
    if request.method == 'POST':
        print(request.body)
        body = json.loads(request.body)
        cpf = body['cpf']
        password = body['password']
        print(cpf)
        print(password)
        user = authenticate(
            cpf=cpf,
            password=password
        )
        if (user is not None):
            auth_login(request, user)
            user = User.objects.get(cpf=cpf)
            return JsonResponse({'message': 'Usuário logado com sucesso', 'user' : user.to_json()}, status=200)
        else:
            return JsonResponse({'message': 'Usuário ou senha incorretos'}, status=401)
    else:
        return JsonResponse({'message': 'Método não permitido'}, status=405)



def logout(request):
    auth_logout(request)
    return HttpResponseRedirect("/login/")
