from members.models import CustomUser
import pytest

# NOTE : class/method name must start with "test"
class TestCustomUser:

  @pytest.fixture(autouse=True)
  def setup_fixture(self, custom_user_fixture):
    self.custom_user_fixture = custom_user_fixture

  def test_user_with_default_photo(self, db):
    data = self.custom_user_fixture.user_with_default_photo()
    user = CustomUser.objects.create_user(**data)

    assert user.username == "T.Test"
    assert user.check_password("123456") is True
    
  def test_user_without_email(self, db):
    data = self.custom_user_fixture.user_without_email()
    with pytest.raises(TypeError) as e:
      CustomUser.objects.create_user(**data)

    assert "CustomUserManager.create_user() missing 1 required positional argument: 'email'" == str(e.value)