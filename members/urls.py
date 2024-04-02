from django.urls import path
from .views import CustomUserLoginView

app_name = 'members'

urlpatterns = [
    path('login/', CustomUserLoginView.as_view(), name='login')
]
