from .models import Game, Tag, Review
from .serializers import GameSerializer, TagSerializer, ReviewSerializer
from rest_framework import generics

from django.contrib.staticfiles import views


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
        if name is not None:
            queryset = queryset.filter(name__contains=name)
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


class ReviewList(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        queryset = Review.objects.all()
        game_id = self.kwargs.get('game_id', None)
        if game_id is not None:
            queryset = queryset.filter(game=game_id)
        return queryset
