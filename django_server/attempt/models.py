from django.db import models
from django.conf import settings

from assesment.models import Assesment, Question, Choice

User = settings.AUTH_USER_MODEL # auth.User

class Attempt(models.Model):
    user = models.ForeignKey(User, default=1, null=True, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    assesment = models.ForeignKey(Assesment, null=True, on_delete=models.SET_NULL)
    should_finish_before = models.DateTimeField()
    finished_at = models.DateTimeField(blank=True, null=True)
    questions = models.ManyToManyField(Question, through="QuestionAnswer")

    def save(self, *args, **kwargs):
        should_finish_before = self.assesment.get_finish_time()
        print("save", should_finish_before)
        self.should_finish_before = should_finish_before
        super().save(*args, **kwargs)
        questions = self.assesment.get_assessment_questions()
        for question in questions:
            self.questions.add(question)

class QuestionAnswer(models.Model):
    attempt = models.ForeignKey(Attempt, null=True, on_delete=models.SET_NULL)
    question = models.ForeignKey(Question, null=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    chosen_chioce = models.ForeignKey(Choice, null=True, blank=True, on_delete=models.SET_NULL)

    def is_answer(self) -> bool:
        return self.chosen_chioce is not None
