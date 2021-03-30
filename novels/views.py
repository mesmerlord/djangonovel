from django.shortcuts import render, get_object_or_404
from .models import Novel, Author, Category, Chapter
from .serializers import (NovelSerializer, CategorySerializer,
                        AuthorSerializer,ChaptersSerializer,ChapterSerializer)
from rest_framework import viewsets
from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS
from rest_framework.response import Response
from .tasks import addCat, addNovel, addChaps
from django.http import HttpResponse
from rest_framework.pagination import PageNumberPagination
from django.http import Http404


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS

class CategorySerializerView(viewsets.ModelViewSet):
    permission_classes = [ReadOnly]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    

class AuthorSerializerView(viewsets.ModelViewSet):
    permission_classes = [ReadOnly]
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

class SingleChapterSerializerView(viewsets.ModelViewSet):
    permission_classes = [ReadOnly]
    queryset = Chapter.objects.all()
    serializer = ChapterSerializer(queryset)
    def retrieve(self, request, pk = None):
        object = get_object_or_404(self.queryset,novSlugChapSlug = pk)
        serializer = ChapterSerializer(object)
        return Response(serializer.data)
    def list(self, request):
        raise Http404
 

class ChaptersSerializerView(viewsets.ModelViewSet):
    permission_classes = [ReadOnly]
    queryset = Chapter.objects.all()
    serializer = ChaptersSerializer(queryset)

    def retrieve(self, request, pk=None):
        
        queryset = Chapter.objects.filter(novelParent = pk).order_by("index")
        serializer = ChaptersSerializer(queryset, many = True)
        return Response(serializer.data)
    def list(self, request):
        queryset = Chapter.objects.filter(index = 1)
        serializer = ChaptersSerializer(queryset, many = True)
        return Response(serializer.data)

class NovelSerializerView(viewsets.ModelViewSet):
    permission_classes = [ReadOnly]
    queryset = Novel.objects.all()
    serializer_class = NovelSerializer

def catUpload(request):
    addCat.delay()
    return HttpResponse("<li>Done</li>")

def novelUpload(request):
    addNovel.delay()
    return HttpResponse("<li>Done</li>")

def chapUpload(request):
    
    addChaps.delay()
    return HttpResponse("<li>Done</li>")