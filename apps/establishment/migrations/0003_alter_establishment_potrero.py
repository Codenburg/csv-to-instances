# Generated by Django 4.1.7 on 2023-06-27 22:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("potreros", "0001_initial"),
        ("establishment", "0002_alter_establishment_name"),
    ]

    operations = [
        migrations.AlterField(
            model_name="establishment",
            name="potrero",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT, to="potreros.potrero"
            ),
        ),
    ]
