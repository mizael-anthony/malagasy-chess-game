from django.shortcuts import render
from django.views import generic

# Create your views here.
class ClubView(generic.View):
    def get(self, request):
        return render(request, 'club/home.html')
    
