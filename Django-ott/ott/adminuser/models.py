from django.db import models
from django.contrib.auth.models import AbstractUser

class admin_user(AbstractUser):                     #for customizing the django auth table, here we add email and other 3 ,there's only username and password field
    email=models.CharField(unique=True, max_length=50)      
    token=models.CharField(max_length=50,null=True)
    block=models.BooleanField(default=False)
    is_admin=models.BooleanField(default=False)

    USERNAME_FIELD = "email"  #these are for login purpose where to replace username as email filed
    REQUIRED_FIELDS = ["username"]
    
    
    