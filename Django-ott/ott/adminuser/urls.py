from django.urls import path
from .import views 


urlpatterns = [
    
    path('adminlogin/', views.adminlogin, name='adminlogin' ),
    path('adminhome/', views.adminhome, name='adminhome' ),
    # path("changepassword", views.changepassword, name='changepassword' ),
    path("adminview/<int:id>", views.adminview, name='adminview' ),
    path("admincreate/", views.admincreate, name='admincreate' ),
    path("adminedit/<int:id>/", views.adminedit, name='adminedit' ),
    path("admindelete/<int:id>/", views.admindelete, name='admindelete' ),
    path("usermanagement/", views.usermanagement, name='usermanagement' ),
    path("moviehistory/<int:user_id>/", views.moviehistory, name='moviehistory' ),
    path("admincount", views.admincounts, name='admincount' ),
    path("block/<int:user_id>/", views.blockuser, name='block' ),
    path("unblock/<int:user_id>/", views.unblockuser, name='unblock' ),


    
]

