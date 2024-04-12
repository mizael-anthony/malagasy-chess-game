from django.db import models
from members.models import CustomUser
from django.utils.translation import gettext_lazy as _
from common.models import TimeStampedModel

# Create your models here.

class CashRegister(TimeStampedModel):
  name = models.CharField(max_length=150, blank=False, null=True, verbose_name=_("Nom"))
  current_balance = models.DecimalField(max_digits=5, decimal_places=2)

  class Meta:
    verbose_name = _("Caisse")
    verbose_name_plural = _("Caisses")

class Reason(models.Model):

  TRANSACTION_TYPE = [
    ('debit', 'Débit'),
    ('credit', 'Crédit')
  ]

  name = models.CharField(max_length=150, blank=False, null=True, verbose_name=_("Nom"))
  transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPE, null=True, verbose_name=_("Opération"))

  class Meta:
    verbose_name = _("Motif")
    verbose_name_plural = _("Motifs")


class Transaction(TimeStampedModel):
  amount = models.DecimalField(max_digits=5, decimal_places=2)
  user = models.ForeignKey(CustomUser, on_delete=models.PROTECT, null=True, verbose_name="Membre")
  reason = models.ForeignKey(Reason, on_delete=models.PROTECT, null=True, verbose_name="Motif")

  class Meta:
    verbose_name = _("Transaction")
    verbose_name_plural = _("Transactions")








