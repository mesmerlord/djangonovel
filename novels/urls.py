
from django.contrib import admin
from django.urls import path, include
from django.contrib.auth.models import User
from rest_framework import routers
from .models import Novel
from .views import (NovelSerializerView, CategorySerializerView, 
                AuthorSerializerView, ChapterSerializerView, catUpload,
                novelUpload,chapUpload )


router = routers.DefaultRouter()
router.register('api/novels', NovelSerializerView)
router.register('api/category', CategorySerializerView)
router.register('api/author', AuthorSerializerView)
router.register('api/chapters', ChapterSerializerView)

urlpatterns = [
    path('', include(router.urls)),
    path("upload/category", catUpload),
    path("upload/novels", novelUpload),
    path("upload/chapters", chapUpload),
]
