from django.shortcuts import render, get_object_or_404
from .models import Novel, Author, Category, Chapter
from .serializers import NovelSerializer, CategorySerializer,AuthorSerializer,ChapterSerializer
from rest_framework import viewsets
from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS
from rest_framework.response import Response
from .tasks import addCat, addNovel, addChaps
from django.http import HttpResponse


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

class ChapterSerializerView(viewsets.ViewSet):
    permission_classes = [ReadOnly]
    queryset = Chapter.objects.all()
    def list(self, request):
        queryset = Chapter.objects.all()
        serializer = ChapterSerializer(queryset, many=True)
        return Response(serializer.data)
    # serializer_class = ChapterSerializer
    def retrieve(self, request, pk=None):
        queryset = Chapter.objects.all()
        chapter = get_object_or_404(queryset, novSlugChapSlug=pk)
        serializer = ChapterSerializer(chapter)
        return Response(serializer.data)
def catUpload(request):
    addCat.delay()
    return HttpResponse("<li>Done</li>")

def novelUpload(request):
    addNovel.delay()
    return HttpResponse("<li>Done</li>")

def chapUpload(request):
    
    addChaps.delay()
    return HttpResponse("<li>Done</li>")