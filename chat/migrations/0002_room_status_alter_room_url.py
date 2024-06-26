# Generated by Django 4.2.1 on 2023-09-08 03:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='status',
            field=models.CharField(choices=[('waiting', 'waiting'), ('active', 'Active'), ('closed', 'Closed')], default='waiting', max_length=20),
        ),
        migrations.AlterField(
            model_name='room',
            name='url',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
