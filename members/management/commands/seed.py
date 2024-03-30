from typing import Any
from django.core.management.base import BaseCommand
from members.models import CustomUser

class Command(BaseCommand):
  help = "Seed for member application"

  def handle(self, *args, **options):
    users = CustomUser.objects.all()
    for user in users:
      user.username=f"{user.last_name[0].upper()}.{user.first_name.capitalize()}"
      user.save()
