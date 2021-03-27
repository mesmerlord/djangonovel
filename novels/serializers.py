from rest_framework import serializers
from .models import Novel,Category,Author,Chapter

class CategorySerializer(serializers.HyperlinkedModelSerializer):
    catSlug = serializers.SlugField(source='slug')
    class Meta:
        model = Category
        fields = ('id','name', 'catSlug')

class AuthorSerializer(serializers.HyperlinkedModelSerializer):
    
    class Meta:
        model = Author
        fields = ('name', 'slug')
class ChapterNovelSerializer(serializers.ModelSerializer):
    novelName = serializers.CharField(source = "name")
    class Meta:
        model = Novel
        fields = ('novelName', 'slug')

class NovelSerializer(serializers.HyperlinkedModelSerializer):
    
    link = serializers.CharField(source='linkNU')
    category = CategorySerializer(many = True)
    author = AuthorSerializer()
    class Meta:
        model = Novel
        fields = ('url','name', 'image','link','description','slug','numOfChaps','novelStatus',
        'author', 'category')
class ChapterSerializer(serializers.ModelSerializer):
    novel = serializers.CharField(source = 'novelParent.name')
    novSlug = serializers.CharField(source = 'novelParent.slug')
    
    class Meta:
        model = Chapter
        fields = ('index','title','text','nextChap','novel','novSlug','novSlugChapSlug')