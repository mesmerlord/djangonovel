from django.db import models
from rest_framework import serializers

# Create your models here.

class Author(models.Model):
    name = models.CharField(max_length = 30)
    index = models.AutoField(primary_key = True)
    slug = models.SlugField(max_length = 20)

class Category(models.Model):
    #Also used for language instead of creating a new model
    name = models.CharField(max_length = 30)
    index = models.AutoField(primary_key = True)
    slug = models.CharField(max_length = 20)

class Novel(models.Model):
    index = models.AutoField(primary_key = True)
    name = models.CharField(max_length = 100)
    image = models.URLField(blank = True)
    linkNU = models.URLField(blank = True)
    author = models.ForeignKey(Author, on_delete = models.CASCADE, null = True)
    category = models.ManyToManyField(Category, null = True)
    description = models.TextField(blank = True)
    slug = models.SlugField(blank = True)
    numOfChaps = models.IntegerField(default = 0)
    novelStatus = models.BooleanField(default = True) #True will be for Ongoing, False for Completed







    