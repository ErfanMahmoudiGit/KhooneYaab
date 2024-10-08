# Generated by Django 5.0.4 on 2024-09-12 12:58

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Building",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("owner_id", models.IntegerField()),
                ("city", models.CharField(max_length=255)),
                ("category", models.CharField(max_length=255)),
                ("title", models.CharField(max_length=255)),
                ("time", models.DateField()),
                ("meterage", models.FloatField()),
                ("price", models.BigIntegerField()),
                ("price_per_meter", models.FloatField()),
                ("image", models.URLField()),
                ("description", models.TextField()),
                ("floor", models.IntegerField()),
                ("all_floors", models.IntegerField()),
                ("build_date", models.IntegerField()),
                ("prioritized", models.IntegerField()),
                ("rooms", models.IntegerField()),
                ("facilities", models.JSONField()),
                ("direction", models.CharField(max_length=255)),
                ("document_type", models.CharField(max_length=255)),
                ("status", models.CharField(max_length=255)),
                ("latitude", models.FloatField()),
                ("longitude", models.FloatField()),
                ("priorities", models.JSONField()),
                ("times_viewed", models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name="Comment",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("writer_id", models.IntegerField()),
                ("writer_name", models.CharField(max_length=255)),
                ("description", models.TextField()),
                ("created_at", models.DateTimeField(default=django.utils.timezone.now)),
                ("sentiment", models.CharField(blank=True, max_length=50)),
                (
                    "building",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="comments",
                        to="ProximityFinder.building",
                    ),
                ),
            ],
        ),
    ]
