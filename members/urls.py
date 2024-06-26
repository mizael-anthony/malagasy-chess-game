from django.urls import path
from .views import CustomLoginView, CustomLogoutView, SignUpView, CustomUserListView

app_name = 'members'

urlpatterns = [
    path('login/', CustomLoginView.as_view(), name='login'),
    path('logout/', CustomLogoutView.as_view(), name='logout'),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('list/', CustomUserListView.as_view(), name='list')
]
