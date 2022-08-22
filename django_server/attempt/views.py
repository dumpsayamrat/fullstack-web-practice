from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Attempt, QuestionAnswer
from assesment.models import Assesment, Choice
from .serializers import AttemptSerializer, QuestionAnswerSerializer

class AttemptListCreateAPIView(
    generics.ListCreateAPIView):
    queryset = Attempt.objects.all()
    serializer_class = AttemptSerializer

    def perform_create(self, serializer):
        print(self.request.data.get)
        assesment_id = self.request.data.get("assesment_id")
        assesment = Assesment.objects.get(pk=assesment_id)
        serializer.save(assesment=assesment, user=self.request.user)

attempt_list_create_view = AttemptListCreateAPIView.as_view()

@api_view(["PATCH"])
def answer_questions(request):
    question_answers = request.data
    for qa in question_answers:
        answer = QuestionAnswer.objects.get(pk=qa.get('pk'))
        choice = Choice.objects.get(pk=qa.get('choice_id'))
        answer.chosen_chioce = choice
        answer.save()

    return Response(status=204)
