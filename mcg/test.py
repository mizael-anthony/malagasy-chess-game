import environ
import os
from .settings import *

# Initialise environment variables
env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, '.env.test'))

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# Hosts
ALLOWED_HOSTS = ['localhost', '127.0.0.1']

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('SECRET_KEY')

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': env('DB_NAME'),
        'USER': env('DB_USER'),
        'HOST': env('DB_HOST'),
        'PORT': env('DB_PORT'),
        'PASSWORD': env('DB_PASSWORD')
    }
}