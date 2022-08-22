from rest_framework import serializers
from rest_framework.reverse import reverse

from api.serializers import UserPublicSerializer

from .models import Assesment

class ChoiceSerializer(serializers.ModelSerializer):
    title = serializers.CharField()
    class Meta:
        model = Assesment
        fields = [
            'pk',
            'title',
        ]

class QuestionSerializer(serializers.ModelSerializer):
    title = serializers.CharField()
    content = serializers.CharField()
    choices = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Assesment
        fields = [
            'title',
            'content',
            'choices',
        ]

    def get_choices(self, question):
        choices_qs = question.choice_set.all()
        return ChoiceSerializer(choices_qs, many=True, context=self.context).data


class AssesmentSerializer(serializers.ModelSerializer):
    owner = UserPublicSerializer(source='user', read_only=True)
    title = serializers.CharField()
    description = serializers.CharField()
    questions = QuestionSerializer(many=True)
    class Meta:
        model = Assesment
        fields = [
            'owner',
            'pk',
            'title',
            'description',
            'questions'
        ]
