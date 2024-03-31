import environ
import os
from .settings import *

# Initialise environment variables
env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, '.env.production'))

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

# Hosts
ALLOWED_HOSTS = []