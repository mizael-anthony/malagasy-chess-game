from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from members.models import CustomUser

# Register your models here.
@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
  list_display = ('__str__', 'email', 'contacts',  'get_user_age',)
  ordering =  ('-date_joined',)

  fieldsets = (
    (None, {
        'fields': ('username', 'password')
    }),
    ('Informations personnelles', {
        'fields': (
            'photo', 'first_name', 'last_name', 'email',
            'birthday', 'gender', 'contacts',
            )
    }),
    ('Permissions', {
        'fields': (
            'is_active', 'is_staff', 
            )
    }),
  )


  add_fieldsets = (
    (None, {
        'fields': ('username', 'password1', 'password2',)
    }),
    ('Informations personnelles', {
        'fields': (
            'photo', 'first_name', 'last_name', 'email',
            'birthday', 'gender', 'contacts',
        )
    }),
    ('Permissions', {
        'fields': (
            'is_active', 'is_staff', 
            )
    }),
    )

