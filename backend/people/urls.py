
from django.urls import path
from .views import *

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('posts/', PostUserAPI.as_view()),
    # path('description/', Description.as_view()),
    path('views/<int:id>/', PostDetailView.as_view())
]
