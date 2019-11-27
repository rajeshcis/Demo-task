"""View of country api."""
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import login, logout
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .serializers import LoginSerializer, LocationSerializer, TargetGroupSerializer, PriceSerializer
from .models import Country, LocationGroup, Location, TargetGroup
from .utils import to_count_a


class LoginAPIView(generics.GenericAPIView):
    """Login Api for the User Authentication."""

    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        """Create user login."""
        data = {
            'msg': "Successfully logged in.",
        }
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            authenticated_user = serializer.validated_data.get(
                'authenticated_user')
            if authenticated_user:
                login(request, authenticated_user)
                data['id'] = authenticated_user.id
                data['username'] = authenticated_user.username
                data['email'] = authenticated_user.email
                data["status"] = True
            return Response(data, status=status.HTTP_200_OK)
        else:
            data['msg'] = "Error"
            data["status"] = False
            return Response(data, status=status.HTTP_401_UNAUTHORIZED)


class LogoutAPIView(APIView):
    """Logout user."""

    queryset = []

    def get(self, request, format=None):
        """User logout."""
        data = {
            'msg': "Logged out.",
            'status': True
        }
        logout(request)
        return Response(data, status=status.HTTP_200_OK)


class LocationCountryView(generics.ListAPIView):
    """Get the locations of selected_country."""

    serializer_class = LocationSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Get locations."""
        if self.kwargs.get('country_code', None):
            location_objs = Location.objects.filter(
                group_ref__country_ref__country_code=self.kwargs.get('country_code'))
            return location_objs


class TargetGroupCountryView(generics.ListAPIView):
    """Get the target gorups of selected_country."""

    serializer_class = TargetGroupSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Get target groups."""
        if self.kwargs.get('country_code', None):
            selected_country = Country.objects.get(country_code=self.kwargs.get('country_code'))
            target_grp_objs = TargetGroup.objects.filter(
                panel_provider=selected_country.panel_provider)
            return target_grp_objs


class CalculatePriceView(generics.GenericAPIView):
    """Calculate price according to selected country."""

    serializer_class = PriceSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        """Calculate price api."""
        serializer = self.serializer_class(data=request.data)
        data = {
            'msg': "",
            'status': False,
        }
        if serializer.is_valid():
            panel_obj = serializer.validated_data.get('country_code')
            panel_code = panel_obj.code
            if panel_code == 'panel001':
                price = to_count_a("https://time.com", panel_code)
            if panel_code == 'panel002':
                price = to_count_a("http://openlibrary.org/search.json?q=the+lord+of+the+rings", panel_code)
            if panel_code == 'panel003':
                price = to_count_a("https://time.com", panel_code)
            data['panel_provider_id'] = panel_obj.id
            data['panel_provider_code'] = panel_obj.code
            data['msg'] = "Success"
            data['status'] = True
            data['panel_price'] = price
            return Response(data, status=status.HTTP_200_OK)
        else:
            data['msg'] = serializer.errors
            return Response(data, status=status.HTTP_400_BAD_REQUEST)
