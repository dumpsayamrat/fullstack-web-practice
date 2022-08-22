from rest_framework import generics

from .models import Assesment
from .serializers import AssesmentSerializer

class AssesmentListCreateAPIView(
    generics.ListCreateAPIView):
    queryset = Assesment.objects.all()
    serializer_class = AssesmentSerializer

    def perform_create(self, serializer):
        serializer.save()

assesment_list_create_view = AssesmentListCreateAPIView.as_view()
