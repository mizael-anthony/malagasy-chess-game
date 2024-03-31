from factories import CustomUserFactory
import pytest

@pytest.fixture(scope="class")
def custom_user_fixture(request):
  fixture = CustomUserFactory()
  yield fixture
  del fixture