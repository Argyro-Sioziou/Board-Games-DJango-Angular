from .models import Game, Tag, Review, Comment
from .serializers import GameSerializer, TagSerializer, ReviewSerializer, CommentSerializer
from rest_framework import generics

from django.contrib.staticfiles import views

from rest_framework import permissions

def index(request, path=''):
    if path.endswith('.js'):
        return views.serve(request, path)
    else:
        return views.serve(request, 'index.html')


class GameList(generics.ListCreateAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    def get_queryset(self):
        queryset = Game.objects.all()
        name = self.request.query_params.get('name', None)
        tags = self.request.query_params.get('tags', None)
        min_age = self.request.query_params.get('min_age', None)
        max_age = self.request.query_params.get('max_age', None)
        min_num_of_players = self.request.query_params.get('min_num_of_players', None)
        max_num_of_players = self.request.query_params.get('max_num_of_players', None)
        min_price = self.request.query_params.get('min_price', None)
        max_price = self.request.query_params.get('max_price', None)
        min_rate = self.request.query_params.get('min_rate', None)
        max_rate = self.request.query_params.get('max_rate', None)

        if name is not None:
            queryset = queryset.filter(name__contains=name)
        if tags is not None:
            for tag in tags.split(","):
                queryset = queryset.filter(tags__in=tag)
        if min_age is not None:
            queryset = queryset.filter(min_age__gte=min_age)
        if max_age is not None:
            queryset = queryset.filter(max_age__lte=max_age)
        if min_num_of_players is not None:
            queryset = queryset.filter(min_num_of_players__gte=min_num_of_players)
        if max_num_of_players is not None:
            queryset = queryset.filter(max_num_of_players__lte=max_num_of_players)
        if min_price is not None:
            queryset = queryset.filter(price__gte=min_price)
        if max_price is not None:
            queryset = queryset.filter(price__lte=max_price)
        if min_rate is not None:
            queryset = queryset.filter(rate__gte=min_rate)
        if max_rate is not None:
            queryset = queryset.filter(rate__lte=max_rate)
        return queryset


class GameDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = GameSerializer

    def get_queryset(self):
        queryset = Game.objects.all()
        game_id = self.request.query_params.get('id', None)
        if game_id is not None:
            queryset = queryset.filter(id=game_id)
        return queryset


class TagList(generics.ListCreateAPIView):
    serializer_class = TagSerializer
    queryset = Tag.objects.all()


class CommentList(generics.ListCreateAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        queryset = Comment.objects.all()
        review_id = self.kwargs.get('review_id', None)
        if review_id is not None:
            queryset = queryset.filter(review=review_id)
        return queryset


class ReviewList(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        queryset = Review.objects.all()
        game_id = self.kwargs.get('game_id', None)
        if game_id is not None:
            queryset = queryset.filter(game=game_id)
        return queryset
