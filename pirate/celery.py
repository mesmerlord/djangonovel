from __future__ import absolute_import
import os
FORKED_BY_MULTIPROCESSING=1
from celery import Celery
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pirate.settings')

celery_app = Celery('pirate')
celery_app.config_from_object('django.conf:settings', namespace='CELERY')
celery_app.autodiscover_tasks()

if __name__ == '__main__':
    celery_app.start()