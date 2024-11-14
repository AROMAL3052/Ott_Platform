from django.db import models
from django.core.exceptions import ValidationError


def validate_image_format(image):
    allowed_formats = ['image/jpeg', 'image/png', 'image/jpg']
    if image.file.content_type not in allowed_formats:
        raise ValidationError('Unsupported file format. Only JPEG, PNG, and GIF are allowed.')

def validate_video_format(video):
    allowed_formats = ['video/mp4', 'video/avi', 'video/mkv']
    if video.file.content_type not in allowed_formats:
        raise ValidationError('Unsupported file format. Only MP4, AVI, and MKV formats are allowed.')


class movie(models.Model):
    title=models.CharField(max_length=100)
    description=models.CharField(max_length=2225)
    thumbnail=models.FileField( upload_to='static/images/', blank=True, null=True , validators=[validate_image_format])
    video=models.FileField(upload_to='static/videos/', blank=True, null=True , validators=[validate_video_format])
    count=models.IntegerField(default=0)

class watch_list(models.Model):
    user_id=models.ForeignKey("adminuser.admin_user", on_delete=models.CASCADE,null=True, blank=True)    #adminuser.adminuser is app name.table name for connecting 2 tables, connecting user and movies
    movie_id=models.ForeignKey("movie.movie", on_delete=models.CASCADE,null=True, blank=True)    
    
class movie_history(models.Model):
    user_id=models.ForeignKey("adminuser.admin_user", on_delete=models.CASCADE,null=True, blank=True)    #same here
    movie_id=models.ForeignKey("movie.movie", on_delete=models.CASCADE,null=True, blank=True)            #connected movie table within the movie
    date_time=models.DateTimeField( auto_now=True, auto_now_add=False)
           