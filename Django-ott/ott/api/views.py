from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from .forms import CustomUserCreationForm
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from movie.models import movie
from movie.models import movie_history
from movie.models import watch_list
from django.http import Http404
from .serializers import movieSerializer
from .serializers import MovieHistorySerializer
from django.shortcuts import get_object_or_404
from django.utils import timezone
from .serializers import WatchListSerializer
from .serializers import ChangePasswordSerializer
from django.contrib.auth import update_session_auth_hash
from django.utils import timezone
from datetime import datetime
from django.contrib.auth import logout




# ..................................................signup..................................................................................................
@csrf_exempt
@api_view(['POST'])
@permission_classes((AllowAny,))

def signup(request):
    form=CustomUserCreationForm(data=request.data)
    if form.is_valid():
        user=form.save()
        return Response('created successfully',status.HTTP_201_CREATED,)
    return Response(form.errors,status.HTTP_400_BAD_REQUEST)




# ..........................login........................................................................................................................
@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):
    email = request.data.get("email")
    password = request.data.get("password")
    
    if email is None or password is None:
        return Response({'error': 'Please provide both email and password'},status=HTTP_400_BAD_REQUEST)
    user = authenticate(email=email, password=password)
    
    if not user:
        return Response({'error': 'password or username is invalid'}, status=HTTP_404_NOT_FOUND)
    
    if user.block:
        return Response({'error': 'Your account is blocked. Please contact support.'}, status=status.HTTP_403_FORBIDDEN)
    
    
    token, _ = Token.objects.get_or_create(user=user)
    id= user.id
    return Response({'token': token.key,'id': id,"message":"welcome, you are loggedin"},status=HTTP_200_OK)




# ................................home.....................................................................................................
@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def home(request):
    try:
        filtered_movies = movie.objects.all()
        serializer = movieSerializer(filtered_movies, many=True)
        
        result = [
        {
            "id": movie['id'],
            "title": movie['title'],
            "thumbnail": movie['thumbnail']
        }
        for movie in serializer.data 
    ]
        
        return Response(result, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
 
 
 
    
# ..............................viewpage..........................................................................................................................
from django.utils import timezone
from datetime import timedelta
@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def view(request, movie_id):
    try:
        
        filtered_movie = get_object_or_404(movie, id=movie_id)
        
       
        time_window = timedelta(minutes=5)
        now = timezone.now()

        # Check if there's a recent view entry in movie_history
        recent_view = movie_history.objects.filter(
            user_id=request.user,
            movie_id=filtered_movie,
            date_time__gte=now - time_window
        ).exists()

        if not recent_view:
            # Increment the count if no recent view exists
            filtered_movie.count += 1
            filtered_movie.save()
        
        serializer = movieSerializer(filtered_movie)
        result = {
            "title": serializer.data["title"],
            "thumbnail": serializer.data["thumbnail"],
            "description": serializer.data["description"],
            "video": serializer.data["video"]
        }
        history_entry = movie_history.objects.filter(user_id=request.user, movie_id=filtered_movie).first()
        
        if history_entry:
            readable_date=history_entry.date_time.strftime("%d %B %Y, %I:%M %p")
            history_entry.date_time = timezone.now()  
            history_entry.save()
            message= "time updated"
        else:
            current_time=timezone.now()
            history_entry=movie_history.objects.create(user_id=request.user, movie_id=filtered_movie,date_time =current_time)
            history_entry.save()
            readable_date = current_time.strftime("%d %B %Y, %I:%M %p")
            message= "movie added to watch history"
 
        
        return Response({"movie_id": result,"watch_date": readable_date, "message": message}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)





# ........................................moviehistory..................................................................................
@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def moviehistory(request, user_id):
    try:
            
            if request.user.id != user_id:
                return Response({"error": "You do not have permission to view this user's movie history."}, status=status.HTTP_403_FORBIDDEN)


            filtered_movies = movie_history.objects.filter(user_id=user_id).select_related('movie_id').order_by("-date_time")      
            serializer = MovieHistorySerializer(filtered_movies, many=True)
        
            result = [{
                "title": movie["movie"]["title"],
                "date_time": timezone.localtime(movie_history.date_time).strftime("%d %B %Y"),
                "thumbnail":movie["movie"]["thumbnail"],
                "user_id":request.user.id,
                "movie_id":movie["movie"]["id"],
                "count":movie["movie"]["count"],
                      }   
                      for movie, movie_history in zip(serializer.data, filtered_movies)
                     ] 
        
            return Response(result, status=status.HTTP_200_OK)
    except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)





# .........................................................watchlater...................................................................
@api_view(["POST"])
@permission_classes((IsAuthenticated,))
def watchlater(request):
    try:
        
        movie_id=request.data.get("movie_id")
        selected_movie = get_object_or_404(movie, id=movie_id)

        entry,created = watch_list.objects.get_or_create(
            user_id=request.user,  
            movie_id=selected_movie  
        )
        
        if created:  
            serializer = WatchListSerializer(entry)
            return Response({"message": "Movie added to watch list.","data": serializer.data}, status=status.HTTP_201_CREATED)
        else:  
            return Response({"message": "Movie already in watch list."}, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)





# ................................................................watchlist.............................................................................................
@api_view(["GET"])
@permission_classes((IsAuthenticated,))
def watchlist(request):
    try:
        filtered_movies = watch_list.objects.filter(user_id=request.user).order_by("-id")
      
        serializer = WatchListSerializer(filtered_movies, many=True)
        return Response({"message": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        
    except Exception as e:    
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



# ..................................................................removelist..............................................................................................................
@api_view(['DELETE'])
@permission_classes((IsAuthenticated,))
def removelist(request, movie_id):
    try:
        movie = watch_list.objects.get(movie_id=movie_id,user_id=request.user.id)
        serializer = WatchListSerializer(movie)
        movie.delete()
        return Response({"message":"deleted successfully"}, status=status.HTTP_200_OK)
    except movie.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    
    

# ................................................changepassword.............................................................................................


@api_view(["POST"])
@permission_classes((IsAuthenticated,))
def changepassword(request):
    print("Request user:", request.user)
    if request.user.is_authenticated:
        try:
            user = request.user
            serializer = ChangePasswordSerializer(data=request.data)

            if serializer.is_valid():
                old_password = serializer.validated_data['old_password']
                new_password = serializer.validated_data['new_password']
                conf_password = serializer.validated_data['conf_password']
                
                
                if not user.check_password(old_password):
                    return Response({"old_password": ["Old password is incorrect."]}, status=status.HTTP_400_BAD_REQUEST)

                if new_password != conf_password:
                    return Response({"conf_password": ["Both passwords should be the same."]}, status=status.HTTP_400_BAD_REQUEST)
                
                if len(new_password) < 8:  # Adjust this condition as needed
                    return Response({"new_password": ["New password must be at least 8 characters long."]}, status=status.HTTP_400_BAD_REQUEST)

                user.set_password(serializer.validated_data['new_password'])
                user.save()
                update_session_auth_hash(request, user)
                return Response({"message": "Password changed successfully."}, status=status.HTTP_200_OK)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response({"error": "User is not authenticated."}, status=status.HTTP_401_UNAUTHORIZED)

    # .............................................................................................................................
    
 
    
@csrf_exempt    
@api_view(["POST"])
@permission_classes((IsAuthenticated,))
def logoutview(request):
  
  
    logout(request) 
    return Response({"message": "Successfully logged out."}, status=200)



@csrf_exempt    
@api_view(["GET"])
@permission_classes((IsAuthenticated,))
def search(request,title):
    try:
     
        searchmovies = movie.objects.filter(title__icontains=title)
        
        if not searchmovies.exists():
            return Response({"message": "No movies found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = movieSerializer(searchmovies, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK) 
    
    except Exception as e:
        print(f"An error occurred: {str(e)}")    
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




