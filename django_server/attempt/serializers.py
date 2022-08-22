from rest_framework import serializers

from api.serializers import UserPublicSerializer

from .models import Attempt, QuestionAnswer
from assesment.serializers import QuestionSerializer, AssesmentSerializer
from assesment.models import Assesment

class QuestionAnswerSerializer(serializers.ModelSerializer):
    question_id = serializers.IntegerField(source="question.pk", read_only=True)
    class Meta:
        model = QuestionAnswer
        fields = [
            'pk',
            'question_id',
            'chosen_chioce',
            'is_answer',
        ]

class AttemptSerializer(serializers.ModelSerializer):
    owner = UserPublicSerializer(source='user', read_only=True)
    assesment_title = serializers.CharField(source="assessment.title", read_only=True)
    should_finish_before = serializers.DateTimeField(read_only=True)
    question_anwsers = serializers.SerializerMethodField(read_only=True)
    questions = QuestionSerializer(read_only=True, many=True)
    class Meta:
        model = Attempt
        fields = [
            'owner',
            'pk',
            'assesment_title',
            'created_at',
            'finished_at',
            'should_finish_before',
            'question_anwsers',
            'questions',
        ]

    def get_question_anwsers(self, attempt):
        question_anwsers_qs = attempt.questionanswer_set.all()
        return QuestionAnswerSerializer(question_anwsers_qs, many=True, context=self.context).data
