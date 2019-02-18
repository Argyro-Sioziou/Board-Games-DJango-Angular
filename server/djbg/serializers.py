from rest_framework import serializers
from .models import Tag, Game, Creator, Review, Comment, Profile, User


class GameSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(many=True, read_only=True, slug_field='name')
    creator = serializers.SlugRelatedField(read_only=True, slug_field='name')

    class Meta:
        model = Game
        fields = ('id', 'name', 'rules', 'price', 'rate', 'times_rated', 'min_age', 'max_age', 'min_num_of_players', 'max_num_of_players', 'creator', 'tags')


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
        fields = ('id', 'game', 'user', 'rate', 'text', 'review_date')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'review', 'user', 'text', 'comment_date')

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('__all__')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance
