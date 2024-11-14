from django.urls import path
from .import views
urlpatterns = [
   path("signup",views.signup, name='signup'  ),
   path("login",views.login, name='login'  ),
   path('home', views.home, name='home'),
   path('view/<int:movie_id>/', views.view, name='view'),
   path('history/<int:user_id>/', views.moviehistory, name='history'),
   path('watchlater', views.watchlater, name='watchlater'),
   path('watchlist', views.watchlist, name='watchlist'),
   path('removelist/<int:movie_id>/', views.removelist, name='removelist'),
   path('changepassword', views.changepassword, name='changepassword'),
   path('logout', views.logoutview, name='logout'),
   path('search/<str:title>/', views.search, name='search'),


]