from django.contrib import admin

# Register your models here.

from .models import Feedback

@admin.register((Feedback))


class FeedbackAdmin(admin.ModelAdmin):
    list_display =['name','email','message','created_at']
