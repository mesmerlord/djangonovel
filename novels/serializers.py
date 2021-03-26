from rest_framework import serializers
from .models import Novel,Category,Author

class CategorySerializer(serializers.ModelSerializer):
    catSlug = serializers.SlugField(source='slug')
    class Meta:
        model = Category
        fields = ('index','name', 'catSlug')

class AuthorSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Author
        fields = ('index','name', 'slug')

class NovelSerializer(serializers.ModelSerializer):
    
    link = serializers.CharField(source='linkNU')
    category = CategorySerializer(many = True)
    author = AuthorSerializer()
    class Meta:
        model = Novel
        fields = ('index','name', 'image','link','description','slug','numOfChaps','novelStatus',
        'author', 'category')
