from django.contrib import admin

from .models import Attempt, QuestionAnswer

admin.site.register(Attempt)
admin.site.register(QuestionAnswer)
