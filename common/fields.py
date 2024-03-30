from django.db import models

class CustomCharField(models.CharField):
  def __init__(self, *args, **kwargs):
    self.is_uppercase = kwargs.pop('uppercase', False)
    self.is_capitalcase = kwargs.pop('capitalcase', False)
    super(CustomCharField, self).__init__(*args, **kwargs)

  def get_prep_value(self, value:str):
    value = super(CustomCharField, self).get_prep_value(value)
    if self.is_uppercase is True:
        return value.upper()
    elif self.is_capitalcase is True:
        return value.capitalize()
    else:
        return value