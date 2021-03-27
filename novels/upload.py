from django.core.management import setup_environ
import settings
setup_environ(settings)
import pandas as pd
from django.utils.text import slugify
# from models import Category, Author, Novel
import models

dfCat = pd.read_csv(r'C:\Users\GOVIN\PycharmProjects\piratenovel\pirate\media\newfile3.csv', sep=',')
categories = []
catList = dfCat['Book Genre']
doneList = []
def addCat():
    for i in catList:
        catNames = i.split(':')
        for x in catNames:
            if x not in doneList:
                tempVal = models.Category(
                    name=x,
                    slug=slugify(x))
                categories.append(tempVal)
                doneList.append(x)
    models.Category.objects.bulk_create(categories)