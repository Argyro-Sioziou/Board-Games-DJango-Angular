# Generated by Django 2.1.2 on 2018-11-24 15:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('djbg', '0009_picture'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='game',
            name='picture',
        ),
        migrations.AddField(
            model_name='picture',
            name='game',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='djbg.Game'),
        ),
        migrations.AlterField(
            model_name='picture',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='djbg.Profile'),
        ),
    ]
