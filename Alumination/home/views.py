from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request,'index.html',{})


def register(request):
    return render(request,'register.html',{})

def schedule(request):
    return render(request,'schedule2.html',{})


def gallery(request):
    return render(request,'gallery.html',{})


def contacts(request):
    return render(request,'contacts.html',{})