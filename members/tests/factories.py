from datetime import datetime

class CustomUserFactory():

  def user_with_default_photo(self):
    return {
    'last_name': "Test",
    'first_name': "Test",
    'email': "test@yopmail.com",
    'password': "123456",
    'birthday': datetime.strptime("2010-10-05", "%Y-%m-%d").date(),
    'sex': "homme",
    'contacts': ["034 00 000 00", "032 00 000 00"]
    }

  def user_without_email(self):
    return {
    'last_name': "Test",
    'first_name': "Test",
    'password': "123456",
    'birthday': datetime.strptime("2010-10-05", "%Y-%m-%d").date(),
    'sex': "homme",
    'contacts': ["034 00 000 00", "032 00 000 00"]
    }

