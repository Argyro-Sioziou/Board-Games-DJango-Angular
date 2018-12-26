from django.urls import re_path

from . import views

app_name = 'djbg'

urlpatterns = [
    re_path('^games/?$', views.GameList.as_view()),
    re_path(r'^games/(?P<pk>\d+)/?$', views.GameDetail.as_view()),
    re_path('^tags/?$', views.TagList.as_view()),
    re_path('^reviews/?$', views.ReviewList.as_view()),
    re_path('^reviews/(?P<review_id>[0-9]+)/comments/?$', views.CommentList.as_view()),
    re_path(r'^games/(?P<game_id>[0-9]+)/reviews/?$',
            views.ReviewList.as_view()),
]
