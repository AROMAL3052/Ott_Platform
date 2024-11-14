from django.contrib import admin

# admin.py

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import admin_user  # Import the admin_user model

class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'username', 'is_admin', 'block')


    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('username',)}),
        ('Permissions', {'fields': ('is_admin', 'block', 'is_staff', 'is_superuser')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', 'is_admin', 'block'),
        }),
    )

    search_fields = ('email', 'username')

# Register the admin_user model with the admin site
admin.site.register(admin_user, CustomUserAdmin)

