from django.shortcuts import render
from django.contrib.auth.views import LoginView, LogoutView

# NOTE :
# With CustomUserBackend we can use form.username as email field in login template
# No need to override AuthenticationForm
class CustomLoginView(LoginView):
  template_name = "members/login.html"

class CustomLogoutView(LogoutView):
  template_name = "members/logged_out.html"