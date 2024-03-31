from django.shortcuts import render
from django.views import generic

# Create your views here.
class HomeView(generic.View):
    def get(self, request):
        return render(request, 'common/home.html')
    
