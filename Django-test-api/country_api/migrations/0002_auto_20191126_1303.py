# Generated by Django 2.0.3 on 2019-11-26 13:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('country_api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='country',
            name='country_code',
            field=models.IntegerField(max_length=255),
        ),
    ]
