from django import forms
from .models import movie  # Import your movie model

class MovieForm(forms.ModelForm):
    class Meta:
        model = movie  # Specify the model
        fields = ['title', 'description', 'thumbnail', 'video','count'] 