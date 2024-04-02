from django.shortcuts import render
from django.contrib.auth.views import LoginView

# NOTE :
# With CustomUserBackend we can use form.username as email field in login template
# No need to override AuthenticationForm
class CustomUserLoginView(LoginView):
  template_name = "members/login.html"

