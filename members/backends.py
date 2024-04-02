from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend


class CustomUserBackend(ModelBackend):
  
  def authenticate(self, request, username=None, password=None, **kwargs):
    CustomUserModel = get_user_model()
    try:
        user = CustomUserModel.objects.get(email=username)
    except CustomUserModel.DoesNotExist:
        return None
    else:
        if user.check_password(password):
            return user
    return None