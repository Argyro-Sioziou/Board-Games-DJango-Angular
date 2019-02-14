from rest_framework import serializers
from .models import Tag, Game, Creator, Review, Comment, Profile, User


class GameSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(many=True, read_only=True, slug_field='name')
    creator = serializers.SlugRelatedField(read_only=True, slug_field='name')

    class Meta:
        model = Game
        fields = ('id', 'name', 'rules', 'price', 'rate', 'min_age', 'max_age', 'min_num_of_players', 'max_num_of_players', 'creator', 'tags')


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name')


class CreatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Creator
        fields = ('name')


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'game', 'rate', 'text', 'review_date')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'review', 'profile', 'text', 'comment_date')

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('__all__')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('__all__')
