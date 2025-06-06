from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user_id = validated_data.get('id')  # Get the id from validated_data, if provided
        username = validated_data['username']
        password = validated_data['password']

        # If id is provided, manually set it, else let Django handle it
        if user_id:
            user = User.objects.create(id=user_id, username=username, password=password)
        else:
            user = User.objects.create_user(username=username, password=password)

        return user



class PostUsersSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True, source='user')
    views_count = serializers.SerializerMethodField()


    class Meta:
        model = PostUsers
        fields = ['user', 'user_id', 'title', 'desc', 'created_on', 'views_count']
    

    def get_views_count(self, obj):
        return obj.views.count()