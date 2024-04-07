from datetime import date
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from common import fields as common_field
from django.contrib.postgres import fields as postgres_field
from .validators import validate_contact
from django.utils import timezone
from django.contrib import admin
from django.utils.translation import gettext_lazy as _



def get_photo_path(self, filename):
	file_extension = filename.split('.')[-1]
	instance_id = self.pk
	return f"img/members/{instance_id}.{file_extension}"

class CustomUserManager(BaseUserManager):
	def _create_user(self, email, password, **extra_fields):
		if not email:
				raise ValueError("The given email must be set")
		
		email = self.normalize_email(email)
		user = self.model(email=email, **extra_fields)
		user.set_password(password)
		user.save(using=self._db)
		return user
	
	def create_user(self, email, password, **extra_fields):
		last_name = extra_fields.get("last_name")
		first_name = extra_fields.get("first_name")
		username = f"{last_name[0].upper()}.{first_name.capitalize()}"
		extra_fields.setdefault("is_active", False)
		extra_fields.setdefault("is_staff", False)
		extra_fields.setdefault("is_superuser", False)
		extra_fields.setdefault("username", username)
		return self._create_user(email, password, **extra_fields)

	def create_superuser(self, email, password, **extra_fields):
		extra_fields.setdefault("is_staff", True)
		extra_fields.setdefault("is_superuser", True)

		if extra_fields.get("is_staff") is not True:
				raise ValueError("Superuser must have is_staff=True.")
		if extra_fields.get("is_superuser") is not True:
				raise ValueError("Superuser must have is_superuser=True.")

		return self._create_user(email, password, **extra_fields)

class CustomUser(AbstractUser):

	DEFAULT_PHOTO = 'img/anonymous.png'
	GENDER = [('homme', 'Homme'), ('femme', 'Femme')]

	username = models.CharField(max_length=150, unique=True, blank=True, null=True, verbose_name="Nom d'utilisateur")
	email = models.EmailField(max_length=250, unique=True, blank=False, verbose_name=_("Email"))
	last_name = common_field.CustomCharField(max_length=150, blank=False, uppercase=True, verbose_name="Nom")
	first_name = common_field.CustomCharField(max_length=150, blank=False, capitalcase=True, verbose_name="Prénoms")
	photo = models.ImageField(default=DEFAULT_PHOTO, upload_to=get_photo_path, null=True, verbose_name="Photo")
	birthday = models.DateField(blank=False, null=True, verbose_name="Date de naissance")
	gender = models.CharField(max_length=10, choices=GENDER, null=True, verbose_name="Sexe")
	date_joined = models.DateTimeField(default=timezone.now, verbose_name="Date d'adhésion")
	adress = models.CharField(max_length=250, blank=False, verbose_name="Adresse")
	contacts = postgres_field.ArrayField(
		base_field=models.CharField(max_length=10, blank=False, null=False, unique=True, validators=[validate_contact], verbose_name="Téléphone"),
		size=3
	)
	is_active = models.BooleanField(default=True, verbose_name="Compte Activé")
	is_staff = models.BooleanField(default=False, verbose_name="Membre du bureau")
	is_superuser = models.BooleanField(default=False)
	
	class Meta:
		verbose_name = "Utilisateur"
		verbose_name_plural = "Utilisateurs"
		ordering = ['-date_joined',]
		constraints = [
			models.UniqueConstraint(
				fields=('last_name', 'first_name'), name='name_unique'),
		]

	objects = CustomUserManager()
	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['last_name', 'first_name', 'sex', 'contacts']

	@admin.display(description="Age")
	def get_user_age(self)->int:
		if self.birthday is not None:
			return date.today().year - self.birthday.year
		return 0	

	def __str__(self):
		return f"{self.last_name}, {self.first_name}"