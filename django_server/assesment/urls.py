from django.urls import path

from . import views 

# /api/assesment/
urlpatterns = [
    path('', views.assesment_list_create_view, name='assesment-list'),
]