from django.db import models
from rest_framework import serializers

# Create your models here.

class Author(models.Model):
    name = models.CharField(max_length = 30)
    index = models.AutoField(primary_key = True)
    slug = models.SlugField(max_length = 20)
    def __str__(self):
        return self.name

class Category(models.Model):
    #Also used for language instead of creating a new model
    name = models.CharField(max_length = 30)
    index = models.AutoField(primary_key = True)
    slug = models.CharField(max_length = 20)
    def __str__(self):
        return self.name

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
    def __str__(self):
        return self.name

class Chapter(models.Model):
    index = models.IntegerField(default = None, blank = True)
    text = models.TextField(max_length=None)
    title = models.TextField(max_length = 20)
    novelParent = models.ForeignKey(Novel, on_delete = models.CASCADE)
    nextChap = models.BooleanField(default = False)
    def save(self, *args, **kwargs):
        if not self.index:
            self.index = Chapter.objects.filter(novelParent = self.novelParent).count()+1
            try:
                lastChap = Chapter.objects.get(novelParent = self.novelParent, index = self.index-1)
                if lastChap:
                    lastChap.nextChap = True
                    lastChap.save()
            except:
                pass
            
        super(Chapter, self).save(*args, **kwargs)
    def __str__(self):
        return f"Chapter {self.index} - {self.novelParent}"





    