from django.shortcuts import render
from .models import Novel, Author, Category, Chapter
from .serializers import NovelSerializer, CategorySerializer,AuthorSerializer,ChapterSerializer
from rest_framework import viewsets
from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS

class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


class NovelSerializerView(viewsets.ModelViewSet):
    permission_classes = [ReadOnly]
    queryset = Novel.objects.all()
    serializer_class = NovelSerializer

class CategorySerializerView(viewsets.ModelViewSet):
    permission_classes = [ReadOnly]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    

class AuthorSerializerView(viewsets.ModelViewSet):
    permission_classes = [ReadOnly]
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

class ChapterSerializerView(viewsets.ModelViewSet):
    permission_classes = [ReadOnly]
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer