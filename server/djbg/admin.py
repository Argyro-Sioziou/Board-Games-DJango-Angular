from django.contrib import admin
from .models import Game, Profile, Tag, Review, Creator, Picture, Comment

admin.site.register(Game)
admin.site.register(Tag)
admin.site.register(Review)
admin.site.register(Creator)
admin.site.register(Comment)
admin.site.register(Profile)
