from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello, world. You are at the djbg index.")

def game(request, game_id):
    return HttpResponse("You are looking at game %s." % game_id)

def reviews(request, game_id):
    response = "You are looking at the reviews of game %s."
    return HttpResponse(response % game_id)

def profile(request, profile_id):
    response = "You are looking at profile %s."
    return HttpResponse(response % profile_id)
