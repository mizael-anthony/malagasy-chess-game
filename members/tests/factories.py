from datetime import datetime

class CustomUserFactory():

  def user_with_default_photo(self):
    return {
    'last_name': "Test",
    'first_name': "Test",
    'email': "test@yopmail.com",
    'password': "123456",
    'birthday': datetime.strptime("2010-10-05", "%Y-%m-%d").date(),
    'gender': "homme",
    'contacts': ["0340000000", "0320000000"]
    }

  def user_without_email(self):
    return {
    'last_name': "Test",
    'first_name': "Test",
    'password': "123456",
    'birthday': datetime.strptime("2010-10-05", "%Y-%m-%d").date(),
    'gender': "homme",
    'contacts': ["0340000000", "0320000000"]
    }

