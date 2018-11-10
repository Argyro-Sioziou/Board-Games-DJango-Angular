from django.urls import path

from . import views

app_name = 'djbr'

urlpatterns = [
    path('', views.index, name='index'),
    path('games/<int:game_id>/', views.game, name='book'),
    path('games/<int:game_id>/reviews/', views.reviews, name='reviews'),
    path('profile/<int:profile_id>/', views.profile, name='profile'),
]
