from factories import CustomUserFactory
import pytest

@pytest.fixture()
def custom_user_fixture(db):
  return CustomUserFactory()