from django.db import models
from django.conf import settings
import random
from datetime import datetime, timedelta

User = settings.AUTH_USER_MODEL # auth.User

class Choice(models.Model):
    title = models.CharField(max_length=120)
    content = models.TextField(blank=True, null=True)
    question = models.ForeignKey('Question', on_delete=models.CASCADE, related_name='choice_set')

class Question(models.Model):
    title = models.CharField(max_length=120)
    content = models.TextField(blank=True, null=True)
    answer = models.OneToOneField(Choice, blank=True, null=True, on_delete=models.SET_NULL, related_name='%(class)s_answer')


class Assesment(models.Model):
    user = models.ForeignKey(User, default=1, null=True, on_delete=models.SET_NULL)
    title = models.CharField(max_length=120)
    description = models.TextField(blank=True, null=True)
    number_of_questions = models.IntegerField(default=3)
    public = models.BooleanField(default=True)
    time_per_question = models.IntegerField(default=90)
    questions = models.ManyToManyField(Question)

    def get_assessment_questions(self):
        return random.sample(list(self.questions.all()), self.number_of_questions)

    def get_finish_time(self):
        return datetime.utcnow() + timedelta(seconds=self.time_per_question * self.number_of_questions)
