from django.db import models
from PIL import Image

class Game(models.Model):
    name = models.CharField(max_length=50)
    creator = models.CharField(max_length=50)
    rules = models.TextField(default="")
    price = models.IntegerField('average price in the market')
    picture = models.ImageField(upload_to='static/game')
    release_date = models.DateField()
    rate = models.IntegerField()
    min_age = models.IntegerField(default=0)
    max_age = models.IntegerField(default=100)

    def __str__(self):
        return "%s %s %s %s %s %s %s %s" % (self.name, self.creator, self.rules, self.price, self.release_date, self.rate, self.min_age, self.max_age)

class Profile(models.Model):
    name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    mail = models.EmailField()
    password = models.CharField(max_length=20)
    picture = models.ImageField(upload_to='static/profile')
    birth_date = models.DateField()
    games = models.ManyToManyField(Game, blank=True)

    def __str__(self):
        return "%s %s %s %s" % (self.name, self.surname, self.mail, self.birth_date)

class Review(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    text = models.TextField(default="")
    review_date = models.DateTimeField()

    def __str__(self):
        return "%s %s %s" % (self.title, self.text, self.review_date)

class Tag(models.Model):
    name = models.CharField(max_length=50)
    games = models.ManyToManyField(Game)

    def __str__(self):
        return self.name
