from rest_framework import serializers
from .models import Novel,Category,Author,Chapter
from rest_framework.pagination import PageNumberPagination


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    catSlug = serializers.SlugField(source='slug')
    class Meta:
        model = Category
        fields = ('id','name', 'catSlug')
class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        lookup_field = "novSlugChapSlug"
        fields = ('index','title',"text", "nextChap","novelParent")

class AuthorSerializer(serializers.HyperlinkedModelSerializer):
    
    class Meta:
        model = Author
        fields = ('name', 'slug')

class ChaptersSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chapter
        fields = ('index','title',"novSlugChapSlug")

class NovelSerializer(serializers.HyperlinkedModelSerializer):
    author = AuthorSerializer()

    class Meta:
        model = Novel
        # fields = ('name', 'image','slug','author','description')
        
        fields = '__all__'
        
class NovelInfoSerializer(serializers.ModelSerializer):
    category = CategorySerializer(many = True)
    class Meta:
        model = Novel
        fields = ('name', 'image', 'link', 'description','slug', 'numOfChaps','novelStatus')