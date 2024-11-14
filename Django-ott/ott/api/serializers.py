
from rest_framework import serializers
from movie.models import movie
from movie.models import movie_history
from movie.models import watch_list

class movieSerializer(serializers.ModelSerializer):
    class Meta:
        model = movie
        fields = '__all__'
        


class MovieHistorySerializer(serializers.ModelSerializer):
    movie = movieSerializer(source='movie_id', read_only=True)  # Use `source` to map to `movie_id` field in movie_history
    
    class Meta:
        model = movie_history
        fields = ['date_time', 'movie']
         

class WatchListSerializer(serializers.ModelSerializer):
     movie = movieSerializer(source='movie_id', read_only=True)  # Use `source` to map to `movie_id` field in movie_history
     class Meta:
            model = watch_list
            fields = ['movie']      
            

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    conf_password= serializers.CharField(required=True)
            
