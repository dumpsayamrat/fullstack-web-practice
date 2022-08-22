from django.urls import path

from . import views 

# /api/assesment/
urlpatterns = [
    path('', views.attempt_list_create_view),
    path('answer-questions/', views.answer_questions),
]