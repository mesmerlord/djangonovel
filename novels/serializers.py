from rest_framework import serializers
from .models import Novel,Category,Author

class CategorySerializer(serializers.HyperlinkedModelSerializer):
    catSlug = serializers.SlugField(source='slug')
    class Meta:
        model = Category
        fields = ('index','name', 'catSlug')

class AuthorSerializer(serializers.HyperlinkedModelSerializer):
    
    class Meta:
        model = Author
        fields = ('index','name', 'slug')

class NovelSerializer(serializers.HyperlinkedModelSerializer):
    
    link = serializers.CharField(source='linkNU')
    category = CategorySerializer(many = True)
    author = AuthorSerializer()
    class Meta:
        model = Novel
        fields = ('url','index','name', 'image','link','description','slug','numOfChaps','novelStatus',
        'author', 'category')
