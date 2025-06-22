from rest_framework.permissions import BasePermission

class IsBusinessPermission(BasePermission):
  def has_permission(self, request, view):
    if request.user.user_type == 'business':
      return True
    else:
      return False