# Generated by Django 4.1.7 on 2023-05-11 22:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('trutests', '0002_csvfile'),
    ]

    operations = [
        migrations.RenameField(
            model_name='animal',
            old_name='FECHA',
            new_name='fecha',
        ),
        migrations.RenameField(
            model_name='animal',
            old_name='FECHA_DE_NAC',
            new_name='fecha_de_nac',
        ),
        migrations.RenameField(
            model_name='animal',
            old_name='HORA',
            new_name='hora',
        ),
        migrations.RenameField(
            model_name='animal',
            old_name='IDE',
            new_name='ide',
        ),
        migrations.RenameField(
            model_name='animal',
            old_name='IDV',
            new_name='idv',
        ),
        migrations.RenameField(
            model_name='animal',
            old_name='INSCRIPTA',
            new_name='inscripta',
        ),
        migrations.RenameField(
            model_name='animal',
            old_name='NOTA',
            new_name='nota',
        ),
        migrations.RenameField(
            model_name='animal',
            old_name='PESO',
            new_name='peso',
        ),
        migrations.RenameField(
            model_name='animal',
            old_name='RAZA',
            new_name='raza',
        ),
        migrations.RenameField(
            model_name='animal',
            old_name='UBICACION',
            new_name='ubicacion',
        ),
    ]
