from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import CustomUser
from django.contrib.postgres import forms as postgres_form

class CustomUserCreationForm(UserCreationForm):
  birthday = forms.DateField(
    widget=forms.DateInput(
      attrs={
        'type': 'date'
      }
    )
  )

  contacts = postgres_form.SplitArrayField(
    forms.CharField(max_length=10),
    size=3
  )
  class Meta:
    model = CustomUser
    fields = ('photo', 'email', 'password1', 'password2', 'last_name', 'first_name', 'gender', 'birthday', 'contacts')
    exclude = ('username',)