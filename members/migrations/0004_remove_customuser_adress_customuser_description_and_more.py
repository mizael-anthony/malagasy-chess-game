# Generated by Django 4.1 on 2024-04-07 15:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('members', '0003_customuser_adress_alter_customuser_sex'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='adress',
        ),
        migrations.AddField(
            model_name='customuser',
            name='description',
            field=models.TextField(blank=True, max_length=250, null=True, verbose_name='Description'),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='email',
            field=models.EmailField(max_length=250, unique=True, verbose_name='Email'),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='gender',
            field=models.CharField(choices=[('homme', 'Homme'), ('femme', 'Femme')], max_length=10, null=True, verbose_name='Sexe'),
        ),
    ]
