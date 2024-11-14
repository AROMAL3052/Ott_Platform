from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm
from django.core.exceptions import ValidationError
import re

User=get_user_model()

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ("username", "email","password1","password2")
        

    def clean_username(self):
        username = self.cleaned_data.get("username")
        
        if not username.isalnum():
            raise ValidationError("Username should only contain letters and numbers.")
 
        return username        

    def clean(self):
        cleaned_data = super().clean()
        password1 = cleaned_data.get("password1")
        password2 = cleaned_data.get("password2")
        
        if password1 and password2:
            # Password match check
            if password1 != password2:
                raise ValidationError("Passwords do not match.")
            
            # Add complexity checks for password1
            if len(password1) < 8:
                raise ValidationError("Password should be at least 8 characters long.")
            
            if not re.search(r'[A-Z]', password1):
                raise ValidationError("Password should contain at least one uppercase letter.")
            
            if not re.search(r'[a-z]', password1):
                raise ValidationError("Password should contain at least one lowercase letter.")
            
            if not re.search(r'\d', password1):
                raise ValidationError("Password should contain at least one digit.")
            
            if not re.search(r'[@$!%*?&]', password1):
                raise ValidationError("Password should contain at least one special character (@, $, !, %, *, ?, &).")

        return cleaned_data
    
    
    
