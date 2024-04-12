from django.urls import path
from .views import ClubView

app_name = "club"

urlpatterns = [
  path('', ClubView.as_view(), name="home")
]
