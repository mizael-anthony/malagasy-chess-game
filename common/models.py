from django.db import models

class TimeStampedModel(models.Model):
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  class Meta:
      abstract = True
      ordering = ["-updated_at"]
      get_latest_by = "-updated_at"