# Generated by Django 4.1.7 on 2023-05-05 17:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('trutests', '0002_trutest_file'),
    ]

    operations = [
        migrations.RenameField(
            model_name='trutest',
            old_name='vencimineto_lote',
            new_name='vencimiento_lote',
        ),
    ]
