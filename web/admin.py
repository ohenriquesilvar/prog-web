from django.contrib import admin

from .models.user_model import User
from .models.round_model import Round
from .models.bet_model import Bet
from .models.result_model import Result

admin.site.register(User)
admin.site.register(Bet)
admin.site.register(Round)
admin.site.register(Result)

