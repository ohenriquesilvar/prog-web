from django.urls import path

from . import views

urlpatterns = [
    path("register", views.register, name="register"),
    path("login", views.login, name="login"),
    path("bet/create", views.createBet, name="createBet"),
    path("rounds", views.listRouds, name="listBet"),
    path("bets", views.listBets, name="listBets"),
    path("results", views.listResults, name="result"),
    path("round", views.createRound, name="createRound"),
    path("result", views.createResult, name="createResult"),
]