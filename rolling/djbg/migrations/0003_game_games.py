# Generated by Django 2.1.2 on 2018-11-22 22:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('djbg', '0002_remove_tag_games'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='games',
            field=models.ManyToManyField(to='djbg.Tag'),
        ),
    ]
