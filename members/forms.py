from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from .models import CustomUser
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import authenticate

# class CustomUserAuthenticationForm(forms.Form):
#     email = forms.EmailField(label=_("Email"), max_length=254)
#     password = forms.CharField(label=_("Password"), strip=False, widget=forms.PasswordInput)

#     def __init__(self, *args, **kwargs):
#         self.request = kwargs.pop('request', None)
#         super().__init__(*args, **kwargs)

#     def clean(self):
#         email = self.cleaned_data.get('email')
#         password = self.cleaned_data.get('password')

#         if email and password:
#             user = authenticate(self.request, username=email, password=password)
#             if user is None:
#                 raise forms.ValidationError(_("Invalid email or password."), code='invalid_login')
#             self.confirm_login_allowed(user)

#         return self.cleaned_data

#     def confirm_login_allowed(self, user):
#       if not user.is_active:
#         raise forms.ValidationError(
#             self.error_messages["inactive"],
#             code="inactive",
#         )

#     def get_user(self):
#       return self.user_cache 
    

class CustomUserCreationForm(UserCreationForm):
  class Meta:
    model = CustomUser
    fields = ('email', 'password1', 'password2')