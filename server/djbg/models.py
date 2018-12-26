from django.db import models
from PIL import Image
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Tag(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Creator(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return "%s" % (self.name)

class Game(models.Model):
    name = models.CharField(max_length=50)
    rules = models.TextField(default="")
    price = models.IntegerField('average price in the market')
    rate = models.IntegerField()
    min_age = models.IntegerField(default=0)
    max_age = models.IntegerField(default=100)
    min_num_of_players = models.IntegerField(default=1)
    max_num_of_players = models.IntegerField(default=100)
    creator = models.ForeignKey(Creator, related_name='game', on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag, related_name='games')

    def __str__(self):
        return "%s %s %s %s %s %s %s %s %s" % (self.name, self.creator, self.rules, self.price, self.rate, self.min_age, self.max_age, self.min_num_of_players, self.max_num_of_players)

class Profile(models.Model):
    # Every User will have one related Profile model and vice versa
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    games = models.ManyToManyField(Game, related_name='games', blank=True)

    def __str__(self):
        return "%s %s" % (self.id, self.user.username)

    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)

    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()

class Picture(models.Model):
    picture = models.ImageField(upload_to='static')

    class Meta:
        abstract = True

class Picture_game(Picture):
    picture = models.ImageField(upload_to='static/game')
    game = models.ForeignKey(Game, on_delete=models.CASCADE, null=True)

class Review(models.Model):
    game = models.ForeignKey(Game, related_name='review', on_delete=models.CASCADE)
    rate = models.IntegerField(default=0, validators=[MaxValueValidator(5), MinValueValidator(0)])
    text = models.TextField(default="")
    review_date = models.DateTimeField()

    def __str__(self):
        return "%s %s %s %s" % (self.game, self.rate, self.text, self.review_date)

class Comment(models.Model):
    review = models.ForeignKey(Review, related_name='comments', on_delete=models.CASCADE)
    profile = models.ForeignKey(Profile, related_name='comments', on_delete=models.CASCADE)
    text = models.TextField(default="")
    comment_date = models.DateTimeField()

    def __str__(self):
        return "%s %s" % (self.text, self.comment_date)
