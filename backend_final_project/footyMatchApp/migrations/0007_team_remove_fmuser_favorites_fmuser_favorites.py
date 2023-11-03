# Generated by Django 4.2.6 on 2023-11-03 14:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('footyMatchApp', '0006_profile'),
    ]

    operations = [
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('logo', models.ImageField(upload_to='team_logos/')),
                ('country', models.CharField(max_length=255)),
            ],
        ),
        migrations.RemoveField(
            model_name='fmuser',
            name='favorites',
        ),
        migrations.AddField(
            model_name='fmuser',
            name='favorites',
            field=models.ManyToManyField(blank=True, related_name='fans', to='footyMatchApp.team'),
        ),
    ]