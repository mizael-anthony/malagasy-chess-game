from datetime import datetime
from django.test import TestCase
from members.models import CustomUser

# Create your tests here.
class CustomUserTestCase(TestCase):

  def setUp(self):
    self.data = {
      'last_name': "Test5",
      'first_name': "Test5",
      'email': "test5@yopmail.com",
      'password': "123456",
      'birthday': datetime.strptime("2010-10-05", "%Y-%m-%d").date(),
      'sex': "homme",
      'contacts': ["034 00 000 00", "032 00 000 00"]
    }

    self.user = CustomUser.objects.create_user(**self.data)

  def test_create_user(self):
    self.assertEqual(self.user.last_name, self.data['last_name'])
    self.assertEqual(self.user.__str__(), f"{self.data['last_name']}, {self.data['first_name']}")

