"""Admin side."""
from django.contrib import admin
from .models import PanelProvider, TargetGroup, Country, LocationGroup, Location

admin.site.register(PanelProvider)
admin.site.register(TargetGroup)
admin.site.register(Country)
admin.site.register(LocationGroup)
admin.site.register(Location)
