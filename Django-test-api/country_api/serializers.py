"""Serializers for country api."""
from rest_framework import serializers
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth import authenticate
from .models import Country, Location, LocationGroup, TargetGroup, PanelProvider
import json
import re
import ast


class LoginSerializer(serializers.Serializer):
    """Serializer for user login."""

    username = serializers.CharField()
    password = serializers.CharField(style={'input_type': 'password'})

    def validate_password(self, password):
        """Check password validation."""
        if password == "":
            raise serializers.ValidationError(_("fill the password field"))
        return password

    def validate(self, data):
        """Validation on both of the fields."""
        username = data.get('username')
        password = self.validate_password(data.get('password'))
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise serializers.ValidationError(_("Username does not exists"))
        authenticated_user = authenticate(
            username=user.username, password=password,)
        if authenticated_user:
            data['authenticated_user'] = authenticated_user
        else:
            raise serializers.ValidationError(_("Invalid credentials"))
        return data


class LocationGroupSerializer(serializers.ModelSerializer):
    """Location Group serializer."""

    class Meta:
        """Meta info."""

        model = LocationGroup
        fields = ['id', 'name']


class LocationSerializer(serializers.ModelSerializer):
    """Location serializer."""

    group_ref = LocationGroupSerializer(many=True)

    class Meta:
        """Meta info."""

        model = Location
        fields = ['id', 'name', 'secret_code', 'external_id', 'group_ref']


class TargetGroupSerializer(serializers.ModelSerializer):
    """TargetGroup serializer."""

    class Meta:
        """Meta info."""

        model = TargetGroup
        fields = ['id', 'name']


class PriceSerializer(serializers.Serializer):
    """Serializer class for calculate price."""

    country_code = serializers.IntegerField()
    target_group_id = serializers.IntegerField()
    location = serializers.ListField(child=serializers.CharField(), required=False)

    def validate_location(self, location):
        """Check location validation."""
        ss = re.findall(r'\{.+?\}', location[0], re.DOTALL)
        for dd in ss:
            res = ast.literal_eval(dd)
            try:
                location = Location.objects.get(id=res['id'])
            except Location.DoesNotExist:
                raise serializers.ValidationError(_("The location id you have provided is not valid."))
        return location.name

    def validate_country_code(self, country_code):
        """Check country_code validation."""
        try:
            country = Country.objects.get(country_code=country_code)
        except Country.DoesNotExist:
            raise serializers.ValidationError(_("The code you have provided is not valid."))
        return country.panel_provider

    def validate_target_group_id(self, target_group_id):
        """Check validation for target_group_id."""
        try:
            target_group = TargetGroup.objects.get(id=target_group_id)
        except TargetGroup.DoesNotExist:
            raise serializers.ValidationError(_("The target_group_id you have provided is not valid."))
        return target_group.name
