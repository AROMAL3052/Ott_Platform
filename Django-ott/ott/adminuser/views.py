from django.contrib.auth import get_user_model
from django.shortcuts import render, redirect
from django.contrib import messages
from rest_framework.authtoken.models import Token
from django.contrib.auth.decorators import login_required
from movie.models import movie
from movie.models import movie_history
from adminuser.models import admin_user




def adminlogin(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")
        
        if not email or not password:
            messages.error(request, 'Please provide both email and password')
            return redirect('adminlogin')

       
        User = get_user_model()  
        try:
            user = User.objects.get(email=email)
            if user.check_password(password):  
                if user.is_admin:  
                    token, _ = Token.objects.get_or_create(user=user)
                    request.session['token'] = token.key  
                    # print("token" % token.key)
                    messages.success(request, "Welcome, you are logged in as an Admin!")
                    return redirect('adminhome')  
                else:
                    messages.error(request, 'Access denied: Admins only')
            else:
                messages.error(request, 'Invalid password')
        except User.DoesNotExist:
            messages.error(request, 'User not found')

        return redirect('adminlogin')

    return render(request, 'login.html')  


@login_required(login_url='/adminlogin')
def adminhome(request):
    movies=movie.objects.all()
    return render(request, "home.html",{"movies":movies})

# ////////////////////////////////////////////////////////////////////////////////////////////////////


@login_required(login_url='/adminlogin')
def adminview(request,id):
    movies=get_object_or_404(movie,pk=id)
    return render(request, "viewpage.html",{"movies":movies})


# //////////////////////////////////////////////////////////////////////////////////////////////////////////////////


from django.shortcuts import render, get_object_or_404, redirect


@login_required(login_url='/adminlogin')
def adminedit(request, id):
    movies = movie.objects.get(pk=id)
    
    if request.method == "POST":
        movies.title = request.POST.get('title')
        movies.description = request.POST.get('description') 
        
        if request.FILES.get('thumbnail'):
            movies.thumbnail = request.FILES['thumbnail']
        
        if request.FILES.get('video'):
            movies.video = request.FILES['video']
        
        movies.save()
        return redirect('adminhome')  

    return render(request, 'edit.html', {'movies': movies})



# ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



@login_required(login_url='/adminlogin')
def admindelete(request,id):
    movies=movie.objects.get(pk=id)  
    if request.method == 'POST':
        movies.delete()
        return redirect('adminhome')
    
    return redirect('adminhome')  


# //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@login_required(login_url='/adminlogin')
def admincreate(request):
    if request.method == "POST":
        title=request.POST.get("title")
        description=request.POST.get("description")
        thumbnail=request.FILES.get("thumbnail")
        video=request.FILES.get("video")
        
        movies = movie(
            title=title,
            description=description,
            thumbnail=thumbnail,
            video=video
        )
        movies.save()
        
        return redirect("adminhome")
    
    return render(request,'create.html' )


# /////////////////////////////////////////////////////////////////////////////////////////////////////////////


@login_required(login_url='/adminlogin')
def admincounts(request):
   movies=movie.objects.all()
   return render(request,"viewcount.html", {"movies":movies})

# /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@login_required(login_url='/adminlogin')
def usermanagement(request):
    users = admin_user.objects.filter(is_admin=False)
    
    return render(request, "usermanagement.html", {'users': users})


# ///////////////////////////////////////////////////////////////////////////////////////////////////////////////


@login_required(login_url='/adminlogin')   
def moviehistory(request,user_id):
    history = movie_history.objects.filter(user_id=user_id)  

    return render(request,"moviehistory.html",{'history':history})      



# //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


@login_required(login_url='/adminlogin')
def blockuser(request,user_id):
    user = get_object_or_404(admin_user, id=user_id)  
    user.block=True
    user.save()
    print(f"user {user.username} block: {user.block}")
    return redirect('usermanagement')


@login_required(login_url='/adminlogin')
def unblockuser(request,user_id):
    user = get_object_or_404(admin_user, id=user_id)  
    user.block=False
    user.save()
    return redirect('usermanagement')