# Generated by Django 4.1 on 2024-04-03 04:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('members', '0002_alter_customuser_sex_alter_customuser_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='adress',
            field=models.CharField(default='Andavamamba', max_length=250, verbose_name='Adresse'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='customuser',
            name='sex',
            field=models.CharField(choices=[('homme', 'Homme'), ('femme', 'Femme')], max_length=10, null=True, verbose_name='Genre'),
        ),
        migrations.RenameField(
            model_name='customuser',
            old_name='sex',
            new_name='gender'
        )
    ]