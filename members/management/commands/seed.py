from django.core.management.base import BaseCommand
from members.models import CustomUser
from datetime import datetime
class Command(BaseCommand):
  help = "Seed for member application"

  def handle(self, *args, **options):
    self.create_user()

  def create_user(self):
    user = CustomUser.objects.create_user(
      last_name="Test4",
      first_name="Test4",
      email="test4@yopmail.com",
      password="123456",
      birthday=datetime.strptime("2010-10-05", "%Y-%m-%d").date(),
      sex="homme",
      contacts=["034 00 000 00", "032 00 000 00"]
    )
    user.save()

  def update_user(self):
    users = CustomUser.objects.all()
    for user in users:
      user.username=f"{user.last_name[0].upper()}.{user.first_name.capitalize()}"
      user.save()