# Generated by Django 4.2.6 on 2023-11-03 18:00

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import footyMatchApp.models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('footyMatchApp', '0010_remove_fmuser_favorites'),
    ]

    operations = [
        migrations.AlterField(
            model_name='favorites',
            name='user',
            field=models.ForeignKey(default=footyMatchApp.models.Favorites.set_default_user, on_delete=django.db.models.deletion.CASCADE, related_name='favorite_teams', to=settings.AUTH_USER_MODEL),
        ),
    ]
