"""Country url section."""
from django.urls import path
from .views import LoginAPIView, LogoutAPIView, LocationCountryView, TargetGroupCountryView, CalculatePriceView


urlpatterns = [
    path('login/', LoginAPIView.as_view(), name='user_login'),
    path('logout/', LogoutAPIView.as_view(), name='user_logout'),
    path('locations/<int:country_code>/', LocationCountryView.as_view(),
         name="selected-country-location"),
    path('targetgroup/<int:country_code>/', TargetGroupCountryView.as_view(),
         name="selected-country-target_group"),
    path('calculate-price/', CalculatePriceView.as_view(),
         name="calculate-price")
]
