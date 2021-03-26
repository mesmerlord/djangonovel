
from django.contrib import admin
from django.urls import path, include
from django.contrib.auth.models import User
from rest_framework import routers
from .models import Novel
from .views import NovelSerializerView, CategorySerializerView, AuthorSerializerView

router = routers.DefaultRouter()
router.register('api/novels', NovelSerializerView)
router.register('api/category', CategorySerializerView)
router.register('api/author', AuthorSerializerView)

urlpatterns = [
    path('', include(router.urls)),
]
