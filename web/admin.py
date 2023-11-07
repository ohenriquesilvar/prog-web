from django.contrib import admin

from .models import *

admin.site.register(User)
admin.site.register(Bet)
admin.site.register(Round)
admin.site.register(Result)

