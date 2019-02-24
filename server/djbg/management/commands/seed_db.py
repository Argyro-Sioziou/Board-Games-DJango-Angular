from django.core.management.base import BaseCommand, CommandError

import inspect

from djbg import models
from djbg.models import Creator

import csv

class Command(BaseCommand):
    help = 'Seeds the database with the specified file'

    def add_arguments(self, parser):
        parser.add_argument('model', type=str)
        parser.add_argument('seed_file', type=str)

    def handle(self, *args, **options):
        djbg_models = inspect.getmembers(models, inspect.isclass)
        to_seed = None
        tags = None
        for djbg_model in djbg_models:
            if djbg_model[0] == options['model']:
                to_seed = djbg_model[1]
                break
        if not to_seed:
            return
        with open(options['seed_file'], encoding="utf8") as seed_file:
            seed_reader = csv.reader(seed_file, skipinitialspace=True)
            headers = next(seed_reader)
            for row in seed_reader:
                obj = to_seed()
                for attr, value in zip(headers, row):
                    print(attr, value)
                    if(attr == "creator"):
                        value = Creator.objects.get(id=int(value))
                    if(attr == "tags"):
                        tags = value;
                    else:
                        setattr(obj, attr, value)
                obj.save()
                for tag in tags:
                    if(tag != " "):
                        obj.tags.add(tag)
                print('saving', obj)
