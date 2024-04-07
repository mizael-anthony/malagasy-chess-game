from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import CustomUser

class CustomUserCreationForm(UserCreationForm):
  birthday = forms.DateField(
    widget=forms.DateInput(
      attrs={
        'type': 'date'
      }
    )
  )
  class Meta:
    model = CustomUser
    fields = ('photo', 'email', 'password1', 'password2', 'last_name', 'first_name', 'gender', 'birthday', 'contacts')
    exclude = ('username',)