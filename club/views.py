from django.shortcuts import render
from django.views.generic import View
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy


# Create your views here.

class ClubView(LoginRequiredMixin, View):
    login_url = reverse_lazy("members:login")
    def get(self, request):
        context = {
            "user": request.user
        }
        return render(request, 'club/home.html', context=context)
    
