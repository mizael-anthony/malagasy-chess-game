from django.shortcuts import render
from django.contrib.auth.views import LoginView, LogoutView
from django.urls import reverse_lazy
from django.views import generic
from .forms import CustomUserCreationForm
from .models import CustomUser

# NOTE :
# With CustomUserBackend we can use form.username as email field in login template
# No need to override AuthenticationForm
class CustomLoginView(LoginView):
  template_name = "members/login.html"

class CustomLogoutView(LogoutView):
  template_name = "members/logged_out.html"

class SignUpView(generic.CreateView):
  form_class = CustomUserCreationForm
  model = CustomUser
  success_url = reverse_lazy("members:login")
  template_name = "members/signup.html"

  def form_valid(self, form):
    last_name = form.instance.last_name
    first_name = form.instance.first_name
    form.instance.username = f"{last_name[0].upper()}.{first_name.capitalize()}"
    return super().form_valid(form)
  
class CustomUserListView(generic.ListView):
  model = CustomUser
  paginate_by = 12