"""Models for country app."""
from django.db import models
from mptt.models import TreeForeignKey, MPTTModel


class PanelProvider(models.Model):
    """PanelProvider model."""

    code = models.TextField()

    def __str__(self):
        """Return statement."""
        return self.code


class TargetGroup(MPTTModel):
    """TargetGroup model."""

    name = models.CharField(max_length=255, null=False)
    external_id = models.IntegerField(default=0)
    secret_code = models.TextField()
    parent_target = TreeForeignKey('self', related_name='group_children', null=True, blank=True,
                                   on_delete=models.CASCADE)
    panel_provider = models.ForeignKey(PanelProvider, on_delete=models.CASCADE, related_name='target_panel_provider')

    def __str__(self):
        """Return statement."""
        return self.name

    class MPTTMeta:
        """Asdf."""

        order_insertion_by = ['name']
        parent_attr = 'parent_target'


class Country(models.Model):
    """Country model."""

    country_code = models.IntegerField(max_length=255, null=False)
    panel_provider = models.ForeignKey(PanelProvider, on_delete=models.CASCADE, related_name='country_panel_provider')
    target_ref = models.ManyToManyField(TargetGroup, blank=True, related_name='target_gp')

    def __str__(self):
        """Return statement."""
        return str(self.country_code)


class LocationGroup(models.Model):
    """LocationGroup model."""

    name = models.CharField(max_length=255, null=False)
    country_ref = models.ForeignKey(Country, on_delete=models.CASCADE, related_name='country_locationgp')
    panel_provider = models.ForeignKey(PanelProvider, on_delete=models.CASCADE, related_name='location_panel_provider')

    def __str__(self):
        """Return statement."""
        return self.name


class Location(models.Model):
    """Location model."""

    name = models.CharField(max_length=255, null=False)
    secret_code = models.TextField()
    external_id = models.IntegerField(default=0)
    group_ref = models.ManyToManyField(LocationGroup, blank=True, related_name='location_gp')

    def __str__(self):
        """Return statement."""
        return self.name
