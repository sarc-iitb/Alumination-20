"""Alumination URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.urls import path
from django.contrib import admin
import home.views as views
urlpatterns = [
    path('admin', admin.site.urls),
    path('',views.index,name="home"),
    path('register',views.register,name="register"),
    path('schedule',views.schedule,name="schedule"),
    path('gallery',views.gallery,name="gallery"),
    path('contacts',views.contacts,name="contacts"),
]
