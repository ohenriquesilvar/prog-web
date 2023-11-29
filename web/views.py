from django.shortcuts import render
from django.http import HttpResponse
from .models.user_model import User
from .models.round_model import Round
from .models.bet_model import Bet
from .models.result_model import Result
from django.http import HttpResponseRedirect
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login, logout as auth_logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime
import pytz
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
            isAdmin = user.is_staff
            return JsonResponse({'message': 'Usuário logado com sucesso', 'user' : user.to_json(), 'admin': isAdmin }, status=200)
        else:
            return JsonResponse({'message': 'Usuário ou senha incorretos'}, status=401)
    else:
        return JsonResponse({'message': 'Método não permitido'}, status=405)



def logout(request):
    auth_logout(request)
    return HttpResponseRedirect("/login/")

@csrf_exempt
def createBet(request):
    if request.method == 'POST':
        print(request.body)
        body = json.loads(request.body)
        cpf = body['cpf']
        round_id = body['round_id']
        group = body['group']
        value = body['value']
        user = User.objects.get(cpf=cpf)
        round = Round.objects.get(id=round_id)
        bet = Bet.objects.create(
            user=user,
            round=round,
            group=group,
            value=value
        )
        round.valor += value
        round.save()

        round = Round.objects.get(id=round_id)
        print(round)

        if bet is None:
            return JsonResponse({'message': 'Erro inesperado na aposta'}, status=400)
        
        return JsonResponse({'message': 'Aposta criada com sucesso'}, status=201)
    else:
        return JsonResponse({'message': 'Método não permitido'}, status=405)


@csrf_exempt
def listRouds(request):
    if request.method == 'GET':
        rounds = Round.objects.all()
        roundsAfterToday = []
        for round in rounds:
            if round.date > datetime.now(pytz.utc):
                roundsAfterToday.append({
                    'id': round.id,
                    'date': round.date.strftime("%d/%m/%Y"),                
                })
        return JsonResponse({'rounds': roundsAfterToday}, status=200)
    else:
        return JsonResponse({'message': 'Método não permitido'}, status=405)

@csrf_exempt
def listBets(request):
    if request.method == 'GET':        
        cpf = request.GET.get('cpf')
        user = User.objects.get(cpf=cpf)
        bets = Bet.objects.filter(user=user)
        betsList = []
        for bet in bets:
            betsList.append({
                'id': bet.id,
                'round': bet.round.date.strftime("%d/%m/%Y"),
                'group': bet.group,
                'value': bet.value
            })

        betsList.sort(key=lambda x: x['id'], reverse=True)
        limitedList = betsList[:5]
        return JsonResponse({'bets': limitedList}, status=200)
    else:
        return JsonResponse({'message': 'Método não permitido'}, status=405)

@csrf_exempt
def listResults(request):
    if request.method == 'GET':        
        results = Result.objects.all()
        resultsList = []
        for result in results:
                resultsList.append({
                'id': result.id,
                'round': result.round.date.strftime("%d/%m/%Y"),
                'group': result.number
                })

        resultsList.sort(key=lambda x: x['id'], reverse=True)
        limitedList = resultsList[:5]

        return JsonResponse({'results': limitedList}, status=200)
    else:
        return JsonResponse({'message': 'Método não permitido'}, status=405)




        
