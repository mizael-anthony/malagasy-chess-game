# Generated by Django 4.1 on 2024-03-22 05:15

import common.fields
import django.contrib.postgres.fields
import django.core.validators
from django.db import migrations, models
import django.utils.timezone
import members.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('username', models.CharField(blank=True, max_length=50, null=True, unique=True, verbose_name="Nom d'utilisateur")),
                ('email', models.EmailField(max_length=250, unique=True, verbose_name='Adresse Email')),
                ('last_name', common.fields.CustomCharField(max_length=150, verbose_name='Nom')),
                ('first_name', common.fields.CustomCharField(max_length=150, verbose_name='Prénoms')),
                ('photo', models.ImageField(default='img/anonymous.png', null=True, upload_to=members.models.get_photo_path, verbose_name='Photo')),
                ('birthday', models.DateField(null=True, verbose_name='Date de naissance')),
                ('sex', models.CharField(choices=[('homme', 'Homme'), ('femme', 'Femme')], max_length=10, verbose_name='Sexe')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name="Date d'adhésion")),
                ('contacts', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=10, unique=True, validators=[django.core.validators.RegexValidator(regex='^03([2-4]|8)[0-9]{7}')], verbose_name='Téléphone'), size=3)),
                ('is_active', models.BooleanField(default=True, verbose_name='Compte Activé')),
                ('is_staff', models.BooleanField(default=False, verbose_name='Membre du bureau')),
                ('is_superuser', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'Utilisateur',
                'verbose_name_plural': 'Utilisateurs',
                'ordering': ['-date_joined'],
            },
        ),
        migrations.AddConstraint(
            model_name='customuser',
            constraint=models.UniqueConstraint(fields=('last_name', 'first_name'), name='name_unique'),
        ),
    ]