from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class PostUsers(models.Model):
    user= models.ForeignKey(User, on_delete= models.CASCADE, related_name= 'posts')
    title = models.CharField(max_length= 200)
    desc = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    views = models.ManyToManyField(User,related_name='viewed_posts', blank=True)

    def __str__(self):
        return self.title
    
    def total_votes(self):
        return len(self.views)
